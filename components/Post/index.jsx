import { MDXProvider } from '@mdx-js/react'
import cn from 'classnames'
import { BlogLayout } from '../../components'
import css from './index.module.css'

const Link = ({href, children}) => {
  return <a className='DocsMarkdown--link' href={href}><span className='DocsMarkdown--link-content'>{children}</span></a>
}

const Code = (props) => {
  return <code {...props} className='InlineCode' />
}

const components = {
  a: Link,
  inlineCode: Code,
}

export default function Post({meta, children}) {
  return (
    <MDXProvider components={components}>
      <article className='DocsMarkdown'>
        <BlogLayout meta={meta}>{children}</BlogLayout>
      </article>
    </MDXProvider>
  )
}