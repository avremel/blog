import React from 'react'
import css from './index.module.css'

const BlogLayout = ({children}) => {
  return (
    <div className='DocsPage'>
      <main className='DocsBody'>
        <div className='DocsContent' page-type='document'>
          <article className='DocsMarkdown'>
            {children}
          </article>
        </div>
      </main>
    </div>
  )
}

export default BlogLayout