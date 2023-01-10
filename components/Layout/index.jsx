import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import css from './index.module.css'

const Layout = ({title, children}) => {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css.page}>
        {pathname !== '/' && (
          <nav>
            <a href="/">Home</a>
          </nav>
        )}

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