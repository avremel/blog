import fs from 'node:fs'
import path from 'node:path'
import { getAllPostsMeta } from '../utils/posts.mjs'

const SITE_URL = (process.env.SITE_URL || 'https://www.avikaminetzky.dev').replace(
  /\/$/,
  ''
)
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.xml')

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toUrlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [
    `<loc>${escapeXml(loc)}</loc>`,
    lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : null,
    changefreq ? `<changefreq>${escapeXml(changefreq)}</changefreq>` : null,
    priority ? `<priority>${escapeXml(priority)}</priority>` : null,
  ].filter(Boolean)

  return `  <url>\n    ${parts.join('\n    ')}\n  </url>`
}

const posts = getAllPostsMeta()
const newestPostDate =
  posts.length > 0
    ? posts.reduce(
        (acc, post) => (post.publishedAt > acc ? post.publishedAt : acc),
        posts[0].publishedAt
      )
    : null

const urls = [
  toUrlEntry({
    loc: `${SITE_URL}/`,
    lastmod: newestPostDate,
    changefreq: 'weekly',
    priority: '1.0',
  }),
  ...posts.map((post) =>
    toUrlEntry({
      loc: `${SITE_URL}/posts/${post.slug}`,
      lastmod: post.publishedAt,
      changefreq: 'monthly',
      priority: '0.8',
    })
  ),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

fs.writeFileSync(OUTPUT_PATH, xml, 'utf8')
console.log(`Generated ${path.relative(process.cwd(), OUTPUT_PATH)} with ${urls.length} URLs.`)
