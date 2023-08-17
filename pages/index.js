import React from 'react'
import {Layout} from '../components'

const Home = () => {
  return (
    <Layout title='Avi Kaminetzky - Blog'>
      <ul>
        <li><span>Aug 2023</span><a href="/posts/algolia-ecommerce-nextjs">Algolia + Ecommerce + NextJS</a></li>
        <li><span>Feb 2022</span><a href="/posts/react-flavored-js">React Flavored Javascript</a></li>
        <li><span>April 2018</span><a target="_blank" href="https://medium.com/@avremelk/solr-gottchas-a-tutorial-a953c8b3e775">Solr + Python — A Tutorial</a></li>
        <li><span>May 2019</span><a target="_blank" href="https://github.com/avremel/lucene">Simple Search Engine</a></li>
      </ul>

    </Layout>
  )
}

export default Home