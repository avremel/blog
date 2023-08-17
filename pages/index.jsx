import React from 'react'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Layout } from '../components'

const StackOverflow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="30"
      viewBox="0 0 622 124"
    >
      <g fill="none" fill-rule="evenodd">
        <polygon
          fill="#BBBBBB"
          points="88 80 99 80 99 124 0 124 0 80 11 80 11 113 88 113"
        />
        <path
          fill="#F58025"
          fill-rule="nonzero"
          d="M22.9878906,76.73 L77.0128906,88.085 L79.2838906,77.285 L25.2588906,65.925 L22.9878906,76.73 Z M30.1368906,50.861 L80.1828906,74.169 L84.8448906,64.16 L34.7978906,40.852 L30.1368906,50.861 Z M43.9848906,26.308 L86.4128906,61.639 L93.4788906,53.154 L51.0508906,17.824 L43.9848906,26.308 Z M71.3718906,0.192 L62.5118906,6.782 L95.4598906,51.082 L104.319891,44.493 L71.3718906,0.192 Z M22,102 L77,102 L77,91 L22,91 L22,102 Z"
        />
      </g>
    </svg>
  )
}

const NavItem = ({ date, link, text, external = false }) => {
  return (
    <li className="flex items-center">
      <span className="bg-slate-200 py-1 px-3 rounded-md mr-3 w-[100px] text-center text-sm">
        {date}
      </span>
      <a
        href={link}
        target={external ? '_blank' : ''}
        className="underline underline-offset-4"
      >
        {text}
      </a>
    </li>
  )
}

const Home = () => {
  return (
    <Layout title="Avi Kaminetzky - Blog">
      <header className="mb-4">
        <h1 className="text-lg">Avi Kaminetzky</h1>

        <div className="flex items-center gap-2">
          <a href="https://github.com/avremel" target="_blank">
            <GitHubLogoIcon />
          </a>

          <a
            href="https://meta.stackoverflow.com/users/4822174/avi-kaminetzky"
            target="_blank"
          >
            <StackOverflow />
          </a>
        </div>
      </header>

      <ul className="space-y-3">
        <NavItem
          date="Aug 2023"
          link="/posts/algolia-ecommerce-nextjs"
          text="Algolia + Ecommerce + NextJS"
        />
        <NavItem
          date="Feb 2022"
          link="/posts/react-flavored-js"
          text="React Flavored Javascript"
        />
        <NavItem
          date="April 2018"
          link="https://medium.com/@avremelk/solr-gottchas-a-tutorial-a953c8b3e775"
          text="Solr + Python — A Tutorial"
          external
        />
        <NavItem
          date="May 2019"
          link="https://github.com/avremel/lucene"
          text="Simple Search Engine"
          external
        />
      </ul>
    </Layout>
  )
}

export default Home
