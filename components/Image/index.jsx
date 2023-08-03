import React from 'react'
import cn from 'classnames'
import css from './index.module.css'

const Image = ({ src, alt = '', className = ''}) => {
  return (
    <div className={css.container}>
      <img className={cn(css['image'], className)} src={src} alt={alt} />
    </div>
  )
}

export default Image