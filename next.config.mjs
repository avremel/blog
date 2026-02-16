import createMDX from '@next/mdx'

const CLOUDINARY_CLOUD_NAME = 'dulc6aa6i'
const CLOUDINARY_VERSION = 'v1771278805'
const CLOUDINARY_GAMING_LAPTOP_SKUS = Array.from({ length: 12 }, (_, index) =>
  `gl-${String(index + 1001)}`
)
const toCloudinaryDestination = (publicId, transformations = '') => {
  const base = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`
  if (transformations) {
    return `${base}/${transformations}/${CLOUDINARY_VERSION}/${publicId}`
  }
  return `${base}/${CLOUDINARY_VERSION}/${publicId}`
}
const toCloudinaryDestinationUnversioned = (publicId, transformations = '') => {
  const base = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`
  if (transformations) {
    return `${base}/${transformations}/${publicId}`
  }
  return `${base}/${publicId}`
}
const CLOUDINARY_BLOG_ASSET_REWRITES = [
  {
    source: '/media/algolia-nextjs/algolia-ecommerce.png',
    destination: toCloudinaryDestinationUnversioned(
      'algolia-ecommerce.png',
      'f_auto,q_auto,dpr_auto,c_limit,w_1600'
    ),
  },
  {
    source: '/media/algolia-nextjs/variants.png',
    destination: toCloudinaryDestinationUnversioned(
      'variants.png',
      'f_auto,q_auto,dpr_auto,c_limit,w_1600'
    ),
  },
  {
    source: '/media/algolia-nextjs/debug_relevance.png',
    destination: toCloudinaryDestinationUnversioned(
      'debug_relevance.png',
      'f_auto,q_auto,dpr_auto,c_limit,w_1600'
    ),
  },
  {
    source: '/media/algolia-nextjs/facet.png',
    destination: toCloudinaryDestinationUnversioned(
      'facet.png',
      'f_auto,q_auto,dpr_auto,c_limit,w_1600'
    ),
  },
  {
    source: '/media/algolia-nextjs/range_facet.png',
    destination: toCloudinaryDestinationUnversioned(
      'range_facet.png',
      'f_auto,q_auto,dpr_auto,c_limit,w_1600'
    ),
  },
  {
    source: '/media/algolia-nextjs/algolia-ecommerce.svg',
    destination: toCloudinaryDestinationUnversioned('algolia-ecommerce.svg'),
  },
  {
    source: '/media/ga-refund/ga4-refund-events.png',
    destination: toCloudinaryDestinationUnversioned(
      'ga4-refund-events.png',
      'f_auto,q_auto,dpr_auto,c_limit,w_1600'
    ),
  },
  {
    source: '/media/ai-search/no-frills-ai-product-search.jpg',
    destination:
      'https://res.cloudinary.com/dulc6aa6i/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1600/v1771278427/no-frills-ai-product-search.jpg',
  },
  {
    source: '/media/profile.png',
    destination:
      'https://res.cloudinary.com/dulc6aa6i/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_400,h_400/profile.png',
  },
]
const CLOUDINARY_ROOT_ASSET_REWRITES = [
  {
    source: '/favicon.ico',
    destination: toCloudinaryDestination('favicon.ico'),
  },
  {
    source: '/favicon.svg',
    destination: toCloudinaryDestination('favicon.svg'),
  },
  {
    source: '/favicon-16x16.png',
    destination: toCloudinaryDestination(
      'favicon-16x16.png',
      'f_png,q_auto,c_fill,w_16,h_16'
    ),
  },
  {
    source: '/favicon-32x32.png',
    destination: toCloudinaryDestination(
      'favicon-32x32.png',
      'f_png,q_auto,c_fill,w_32,h_32'
    ),
  },
  {
    source: '/favicon-48x48.png',
    destination: toCloudinaryDestination(
      'favicon-48x48.png',
      'f_png,q_auto,c_fill,w_48,h_48'
    ),
  },
  {
    source: '/apple-touch-icon.png',
    destination: toCloudinaryDestination(
      'apple-touch-icon.png',
      'f_png,q_auto,c_fill,w_180,h_180'
    ),
  },
  {
    source: '/android-chrome-192x192.png',
    destination: toCloudinaryDestination(
      'android-chrome-192x192.png',
      'f_png,q_auto,c_fill,w_192,h_192'
    ),
  },
  {
    source: '/android-chrome-512x512.png',
    destination: toCloudinaryDestination(
      'android-chrome-512x512.png',
      'f_png,q_auto,c_fill,w_512,h_512'
    ),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async rewrites() {
    const gamingLaptopRewrites = CLOUDINARY_GAMING_LAPTOP_SKUS.map((sku) => ({
      source: `/media/gaming-laptops/${sku}.svg`,
      destination: toCloudinaryDestination(`${sku}.svg`),
    }))

    return {
      beforeFiles: [
        ...CLOUDINARY_ROOT_ASSET_REWRITES,
        ...gamingLaptopRewrites,
        ...CLOUDINARY_BLOG_ASSET_REWRITES,
      ],
    }
  },
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
