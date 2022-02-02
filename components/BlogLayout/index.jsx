import React from 'react'
import css from './index.module.css'

const BlogLayout = ({children}) => {
  return (
    <div className={css.wrapper}>{children}</div>
  )
}

export default BlogLayout