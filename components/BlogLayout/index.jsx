import React from 'react'
import Head from 'next/head'
import { HomeIcon } from '@radix-ui/react-icons'
import { VisuallyHidden } from '../index'

const BlogLayout = ({ meta, children }) => {
  const base = `https://www.avikaminetzky.dev`
  const postUrl = meta.slug ? `${base}/posts/${meta.slug}` : null
  const imageUrl = meta.ogImage ? `${base}/${meta.ogImage}` : null
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

  return (
    <div className="p-6 lg:max-w-screen-md lg:mx-auto text-slate-700">
      <Head>
        <title>{meta.title}</title>

        <meta property="og:title" content={meta.title} />
        <meta name="twitter:title" content={meta.title} />

        <meta property="og:type" content="website" />

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
        <div className="flex items-center justify-between mb-4">
          <nav className="">
            <a href="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <HomeIcon width="30" height="30" color="#64748b" />
            </a>
          </nav>

          <div className="border border-solid border-slate-600 text-slate-600 p-1 rounded h-fit w-fit px-3 text-center text-sm">
            {meta.date}
          </div>
        </div>

        <h1>{meta.title}</h1>

        {children}
      </article>
    </div>
  )
}

export default BlogLayout
