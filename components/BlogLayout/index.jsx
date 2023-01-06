import React from 'react'
import { Layout } from '..'
import css from './index.module.css'

const BlogLayout = ({meta, children}) => {
  return (
    <Layout title={meta.title}>
      <article className='markdown'>
        {children}
      </article>
    </Layout>
  )
}

export default BlogLayout