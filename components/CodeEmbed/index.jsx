import React from 'react'
import cn from 'classnames'
import css from './index.module.css'

const CodeEmbed = ({path, linkText}) => {
  if (linkText) {
    return (
      <a href={path} target="_blank" className='DocsMarkdown--link'>
        <span className='DocsMarkdown--link-content'>{linkText}</span>
      </a>
    )
  }
  return (
    <div className={cn(css.wrapper, css['full-width'])}>
      <iframe src={path} width="100%" height="500px"></iframe>
    </div>
  )
}

export default CodeEmbed