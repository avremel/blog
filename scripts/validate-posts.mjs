import { getAllPostsMeta } from '../utils/posts.mjs'

try {
  const posts = getAllPostsMeta()
  console.log(`Validated ${posts.length} post metadata entries.`)
} catch (error) {
  console.error('Post metadata validation failed.')
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
