import React from 'react'
import Head from 'next/head'

const BlogLayout = ({ meta, children }) => {
  return (
    <div className="p-6 lg:max-w-screen-md lg:mx-auto text-slate-700">
      <Head>
        <title>{meta.title}</title>
      </Head>

      <nav className="mb-6">
        <a
          className="solid-solid border-2 border-slate-300 text-slate-700 text-sm rounded-md px-4 py-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          href="/"
        >
          Home
        </a>
      </nav>

      <article
        className="
        prose prose-code:before:hidden prose-code:after:hidden prose-code:bg-slate-100 prose-pre:bg-slate-100
        prose-quoteless prose-blockquote:bg-slate-100 prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:leading-normal
        prose-a:underline prose-a:underline-offset-4 prose-a:decoration-slate-400
      "
      >
        {children}
      </article>
    </div>
  )
}

export default BlogLayout
