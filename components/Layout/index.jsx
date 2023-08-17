import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Layout = ({ title, children }) => {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {pathname !== '/' && (
          <nav className="mb-3">
            <a
              className="border border-gray-200 bg-gray-200 text-gray-700 text-sm rounded-md px-4 py-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              href="/"
            >
              ← Back
            </a>
          </nav>
        )}

        <main>
          <div page-type="document">{children}</div>
        </main>
      </div>
    </>
  )
}

export default Layout
