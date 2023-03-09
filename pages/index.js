import React from 'react'
import {Layout} from '../components'

const Home = () => {
  return (
    <Layout title='Avi Kaminetzky - Blog'>
      <ul>
        <li><a href="/posts/algolia-sanity">Algolia 🤝 Sanity</a></li>
        <li><a href="/posts/endeca-to-algolia">Faceted search: From Endeca to Algolia</a></li>
        <li><a href="/posts/react-flavored-js">React Flavored Javascript</a></li>
      </ul>

    </Layout>
  )
}

export default Home