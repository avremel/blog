import remarkGfm from 'remark-gfm'
import emoji from 'remark-emoji'
import rehypePrettyCode from 'rehype-pretty-code'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [
      [remarkGfm],
      [emoji, { emoticon: true, padSpaceAfter: true }],
    ],
    rehypePlugins: [[rehypePrettyCode, { theme: 'min-light' }]],
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX(nextConfig)
