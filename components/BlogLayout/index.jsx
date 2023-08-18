import React from 'react'
import Head from 'next/head'

const BlogLayout = ({ meta, children }) => {
  return (
    <div className="p-6 lg:max-w-screen-md lg:mx-auto">
      <Head>
        <title>{meta.title}</title>
      </Head>

      <nav className="mb-3">
        <a
          className="solid-solid border-2 border-slate-300 text-slate-700 text-sm rounded-md px-4 py-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
          href="/"
        >
          Home
        </a>
      </nav>

      <article>{children}</article>
    </div>
  )
}

export default BlogLayout
