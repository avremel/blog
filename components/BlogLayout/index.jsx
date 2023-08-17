import React from 'react'
import { Layout } from '..'

const BlogLayout = ({ meta, children }) => {
  return (
    <Layout title={meta.title}>
      <article className="markdown">{children}</article>
    </Layout>
  )
}

export default BlogLayout
