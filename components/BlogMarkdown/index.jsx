import { MDXProvider } from '@mdx-js/react'
import { BlogLayout } from '..'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const Link = ({href, children}) => {
  return (
    <a className='DocsMarkdown--link' href={href} target='_blank'>
      <span className='DocsMarkdown--link-content'>
        {children}
      </span>
    </a>
  )
}

const InlineCode = (props) => {
  return <code {...props} className='InlineCode' />
}

const CodeBlock = ({children}) => {
  return (
    <pre className="CodeBlock CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme">
      <code dangerouslySetInnerHTML={{__html: hljs.highlightAuto(children).value}} />
    </pre>
  )
}

const Aside = ({children}) => {
  return (
    <aside class="DocsMarkdown--aside" role="note" data-type="note">
      <p>{children}</p>
    </aside>
  )
}

const components = {
  a: Link,
  aside: Aside,
  inlineCode: InlineCode,
  code: CodeBlock,
}

export default function Post({meta, children}) {
  return (
    <MDXProvider components={components}>
      <BlogLayout meta={meta}>{children}</BlogLayout>
    </MDXProvider>
  )
}