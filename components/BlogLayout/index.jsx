import React from 'react'
import { Layout } from '..'
import css from './index.module.css'

const BlogLayout = ({meta, children}) => {
  return (
    <Layout title={meta.title}>
      <article className='DocsMarkdown'>
        {children}
      </article>
    </Layout>
  )
}

export default BlogLayout