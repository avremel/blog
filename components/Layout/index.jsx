import React from 'react'
import Head from 'next/head'
import css from './index.module.css'

const Layout = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.page}>
        <main className='body'>
          <div className='content' page-type='document'>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout