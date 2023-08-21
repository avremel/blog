import '../styles/index.css'
import '../styles/globals.css'
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
      <Component {...pageProps} className="DocsPage" />

      <Analytics />
    </MDXProvider>
  )
}

export default MyApp
