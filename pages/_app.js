import '../styles/index.css'
import '../styles/globals.css'
import Head from 'next/head'
import { MDXProvider } from '@mdx-js/react'
import { Analytics } from '@vercel/analytics/react'
import { isValidElement } from 'react'
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

const Pre = ({ className = '', children, ...props }) => {
  const promptLinePattern = /^>\s*/

  if (isValidElement(children) && typeof children.props?.children === 'string') {
    const rawCode = children.props.children.replace(/\r\n/g, '\n')
    const lines = rawCode.split('\n')
    const hasPromptLines = lines.some((line) => promptLinePattern.test(line.trimStart()))

    if (hasPromptLines) {
      return (
        <pre
          {...props}
          className={`bg-slate-100 text-slate-900 ${className}`.trim()}
        >
          <code className={children.props.className}>
            {lines.map((line, index) => {
              const isPromptLine = promptLinePattern.test(line.trimStart())
              return (
                <span
                  key={`line-${index}`}
                  className={isPromptLine ? 'terminal-line terminal-prompt-line' : 'terminal-line'}
                >
                  {line}
                </span>
              )
            })}
          </code>
        </pre>
      )
    }
  }

  return (
    <pre
      {...props}
      className={`bg-slate-100 text-slate-900 ${className}`.trim()}
    >
      {children}
    </pre>
  )
}

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
