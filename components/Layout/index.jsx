import React from 'react'
import Head from 'next/head'

const Layout = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='DocsPage'>
        <main className='DocsBody'>
          <div className='DocsContent' page-type='document'>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout