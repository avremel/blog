import { MDXProvider } from '@mdx-js/react'
import { BlogLayout } from '../../components'

const H1 = (props) => {
  return <h1 {...props} style={{color: 'green'}}/>
}

const components = {
  h1: H1,
}

export default function Post({meta, children}) {
  return (
    <MDXProvider components={components}>
      <main>
        <BlogLayout meta={meta}>{children}</BlogLayout>
      </main>
    </MDXProvider>
  )
}