import React from 'react'
import {Layout} from '../components'

const Home = () => {
  return (
    <Layout title='Avi Kaminetzky - Blog'>
      <ul>
        <li><a href="/posts/algolia-ecommerce-nextjs">Algolia + Ecommerce + NextJS</a></li>
        <li><a target="_blank" href="https://github.com/avremel/lucene">Simple Search Engine</a></li>
        <li><a target="_blank" href="https://medium.com/@avremelk/solr-gottchas-a-tutorial-a953c8b3e775">Solr + Python — A Tutorial</a></li>
        <li><a href="/posts/react-flavored-js">React Flavored Javascript</a></li>
      </ul>

    </Layout>
  )
}

export default Home