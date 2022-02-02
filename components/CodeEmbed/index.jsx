import React from 'react'
import cn from 'classnames'
import css from './index.module.css'

const CodeEmbed = ({path}) => {
  return (
    <div className={css.wrapper}>
      <p>Take the code for a spin 👇</p>
      <div className={cn(css['full-width'])}>
        <iframe src={path} width="100%" height="600px"></iframe>
      </div>
    </div>
  )
}

export default CodeEmbed