import React from 'react'
import cn from 'classnames'
import css from './index.module.css'

const CodeEmbed = ({path}) => {
  return (
    <div className={cn(css.wrapper, css['full-width'])}>
      <iframe src={path} width="100%" height="500px"></iframe>
    </div>
  )
}

export default CodeEmbed