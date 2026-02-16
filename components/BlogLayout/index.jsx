import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const BlogLayout = ({ meta, children }) => {
  const router = useRouter()
  const base = `https://www.avikaminetzky.dev`
  const getAbsoluteAssetUrl = (assetPath) => {
    if (!assetPath) return null
    if (/^https?:\/\//i.test(assetPath)) return assetPath
    if (assetPath.startsWith('/')) return `${base}${assetPath}`
    return `${base}/${assetPath}`
  }
  const postUrl = meta.slug ? `${base}/posts/${meta.slug}` : null
  const imageUrl = getAbsoluteAssetUrl(meta.ogImage)
  const articleSchema =
    postUrl && meta.publishedAt
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: meta.title,
          description: meta.description,
          url: postUrl,
          mainEntityOfPage: postUrl,
          datePublished: meta.publishedAt,
          dateModified: meta.updatedAt || meta.publishedAt,
          author: {
            '@type': 'Person',
            name: 'Avi Kaminetzky',
          },
          image: imageUrl || undefined,
        }
      : null

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      if (event.key.toLowerCase() !== 'c') return
      if (!window.matchMedia('(min-width: 1025px)').matches) return

      const target = event.target
      const tagName = target?.tagName?.toLowerCase?.() || ''
      const isEditable =
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target?.isContentEditable
      if (isEditable) return

      event.preventDefault()
      router.push('/')
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [router])

  return (
    <div className="p-6 lg:max-w-screen-md lg:mx-auto text-slate-700">
      <Head>
        <title>{meta.title}</title>
        {meta.description && <meta name="description" content={meta.description} />}
        {postUrl && <link rel="canonical" href={postUrl} />}

        <meta property="og:title" content={meta.title} />
        <meta name="twitter:title" content={meta.title} />

        <meta property="og:type" content="article" />

        {meta.description && (
          <>
            <meta property="og:description" content={meta.description} />
            <meta name="twitter:description" content={meta.description} />
          </>
        )}

        {postUrl && <meta property="og:url" content={postUrl} />}

        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={meta.title} />
            <meta name="twitter:image" content={imageUrl} />
          </>
        )}

        <meta name="twitter:card" content="summary_large_image" />
        {articleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema),
            }}
          />
        )}
      </Head>

      <article
        className="
          prose prose-code:before:hidden prose-code:after:hidden prose-code:bg-slate-100 prose-pre:bg-slate-100
          prose-quoteless prose-blockquote:bg-slate-100 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:leading-normal
          prose-a:underline prose-a:underline-offset-4 prose-a:decoration-slate-400
          prose-headings:font-semibold
          sup:ml-3
        "
      >
        <header className="not-prose mb-4 flex justify-center">
          <a href="/" className="inline-block text-center no-underline">
            <div className="text-2xl leading-none tracking-tight whitespace-nowrap text-slate-800">
              <span>avi kaminetzky</span>{' '}
              <span className="text-slate-500">on software</span>
            </div>
          </a>
        </header>

        <h1 className="!text-[26px] !leading-tight !mb-2">{meta.title}</h1>
        <div className="text-slate-600 text-sm mb-5">{meta.date}</div>

        {children}
      </article>
    </div>
  )
}

export default BlogLayout
