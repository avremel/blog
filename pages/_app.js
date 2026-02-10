import '../styles/index.css'
import '../styles/globals.css'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { Analytics } from '@vercel/analytics/react'
import slugify from '../utils/slugify'

const H2 = ({ children }) => {
  const id = `${slugify(children)}`
  return (
    <h2 className="" id={id}>
      <a className="" href={`#${id}`} aria-hidden="true">
        {children}
      </a>
    </h2>
  )
}

const Pre = ({ children }) => <pre className="bg-slate-100">{children}</pre>

const components = {
  h2: H2,
  pre: Pre,
}

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <Component {...pageProps} className="DocsPage" />

      <Analytics />
    </MDXProvider>
  )
}

export default MyApp
