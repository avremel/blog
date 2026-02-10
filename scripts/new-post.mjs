import fs from 'node:fs'
import path from 'node:path'
import { postMetaSchema } from '../utils/posts.mjs'

function toSlug(input) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const title = process.argv.slice(2).join(' ').trim()

if (!title) {
  console.error('Usage: npm run new:post -- "Your Post Title"')
  process.exit(1)
}

const now = new Date()
const publishedAt = now.toISOString().slice(0, 10)
const dateLabel = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
}).format(now)
const slug = toSlug(title)
const postPath = path.join(process.cwd(), 'pages', 'posts', `${slug}.mdx`)

if (!slug) {
  console.error('Could not derive a valid slug from title.')
  process.exit(1)
}

if (fs.existsSync(postPath)) {
  console.error(`Post already exists: ${postPath}`)
  process.exit(1)
}

const meta = {
  title,
  description: 'Short summary of this article',
  date: dateLabel,
  publishedAt,
  slug,
}

postMetaSchema.parse(meta)

const content = `---
title: ${JSON.stringify(meta.title)}
description: ${JSON.stringify(meta.description)}
date: ${JSON.stringify(meta.date)}
publishedAt: ${JSON.stringify(meta.publishedAt)}
slug: ${JSON.stringify(meta.slug)}
---

import { BlogMarkdown } from '../../components'

## ${meta.title}

Start writing here.

export default ({ children }) => <BlogMarkdown meta={meta}>{children}</BlogMarkdown>
`

fs.writeFileSync(postPath, content, 'utf8')
console.log(`Created ${path.relative(process.cwd(), postPath)}`)
