import 'highlight.js/styles/github.css'
import '../styles/index.css'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} className='DocsPage' />

      <Analytics />
    </>
  )
}

export default MyApp