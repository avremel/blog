import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

const POSTS_DIR = path.join(process.cwd(), 'pages', 'posts')
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const postMetaSchema = z
  .object({
    title: z.string().trim().min(1, 'title is required'),
    description: z.string().trim().min(1, 'description is required'),
    date: z.string().trim().min(1, 'date label is required'),
    publishedAt: z.preprocess(
      (value) =>
        value instanceof Date ? value.toISOString().slice(0, 10) : value,
      z
        .string()
        .regex(ISO_DATE_REGEX, 'publishedAt must use YYYY-MM-DD format')
    ),
    slug: z.string().regex(SLUG_REGEX, 'slug must be kebab-case'),
    ogImage: z.string().trim().min(1).optional(),
  })
  .strict()

function readPostMetaFromFile(filename) {
  const absolutePath = path.join(POSTS_DIR, filename)
  const source = fs.readFileSync(absolutePath, 'utf8')
  const { data } = matter(source)

  const meta = postMetaSchema.parse(data)
  const expectedSlug = filename.replace(/\.mdx$/, '')

  if (meta.slug !== expectedSlug) {
    throw new Error(
      `Post slug mismatch in ${filename}: frontmatter slug \"${meta.slug}\" must match filename \"${expectedSlug}\"`
    )
  }

  return meta
}

export function getAllPostsMeta() {
  const filenames = fs
    .readdirSync(POSTS_DIR)
    .filter((filename) => filename.endsWith('.mdx'))

  const posts = filenames.map(readPostMetaFromFile)

  const slugs = new Set()
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate post slug found: ${post.slug}`)
    }
    slugs.add(post.slug)
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}
