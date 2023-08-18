import '../styles/index.css'
import '../styles/globals.css'
import { MDXProvider } from '@mdx-js/react'
import { Analytics } from '@vercel/analytics/react'
import slugify from '../utils/slugify'

const Link = ({ href, children }) => {
  return (
    <a
      className="underline underline-offset-4 decoration-slate-400 hover:text-blue-500 hover:no-underline"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  )
}

const H1 = (props) => <h1 {...props} className="text-2xl mb-4 font-semibold" />

const H2 = ({ children }) => {
  const id = `${slugify(children)}`
  return (
    <h2 className="text-xl mb-3 font-semibold" id={id}>
      <a className="" href={`#${id}`} aria-hidden="true">
        {children}
      </a>
    </h2>
  )
}

const H3 = (props) => <h3 {...props} className="text-lg mb-3 font-semibold" />

const H4 = (props) => <h4 {...props} className="text-md mb-2 font-semibold" />

const P = (props) => <p {...props} className="my-3" />

const Strong = (props) => <strong {...props} className="font-semibold" />

const UL = (props) => <ul {...props} className="my-3" />

const LI = (props) => <li {...props} className="mx-6 my-1 list-disc" />

const Table = ({ children }) => {
  return (
    <div className="">
      <table>{children}</table>
    </div>
  )
}

const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: UL,
  li: LI,
  strong: Strong,
  table: Table,
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
