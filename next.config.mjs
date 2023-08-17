import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}
 
const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode]],
    providerImportSource: "@mdx-js/react",
  },
})

export default withMDX(nextConfig)