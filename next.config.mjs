import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',
      ['remark-emoji', { emoticon: true, padSpaceAfter: true }],
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'meta' }],
    ],
    rehypePlugins: [['rehype-pretty-code', { theme: 'min-light' }]],
    providerImportSource: '@mdx-js/react',
  },
})

export default withMDX(nextConfig)
