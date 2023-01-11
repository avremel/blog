import { MDXProvider } from '@mdx-js/react'
import cn from 'classnames'
import { BlogLayout } from '..'
import slugify from '../../utils/slugify'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import css from './index.module.css'

const Link = ({href, children}) => {
  return (
    <a className='link' href={href} target='_blank'>
      <span className='link-content'>
        {children}
      </span>
    </a>
  )
}

const InlineCode = (props) => {
  return <code {...props} className='inline-code' />
}

const CodeBlock = ({children}) => {
  return (
    <pre className={cn(css['code-block-wrapper'])}>
      <code dangerouslySetInnerHTML={{__html: hljs.highlightAuto(children).value}} />
    </pre>
  )
}

const H2 = ({children}) => {
  const id = `${slugify(children)}`
  return (
    <h2 id={id}>
      <span className='DocsMarkdown--header-anchor-positioner'>
        <a className='DocsMarkdown--header-anchor Link Link-without-underline' href={`#${id}`} aria-hidden="true"></a>
      </span>
      <span>{children}</span>
    </h2>
  )
}

const Table = ({children}) => {
  return <div className={css['table-wrapper']}><table>{children}</table></div>
}

const components = {
  a: Link,
  inlineCode: InlineCode,
  code: CodeBlock,
  h2: H2,
  table: Table,
}

export default function Post({meta, children}) {
  return (
    <MDXProvider components={components}>
      <BlogLayout meta={meta}>{children}</BlogLayout>
    </MDXProvider>
  )
}