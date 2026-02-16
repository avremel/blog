import React from 'react'
import Head from 'next/head'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { VisuallyHidden } from '../components'
import { getAllPostsMeta } from '../utils/posts.mjs'

const StackOverflow = () => {
  return (
    <svg
      className="w-[26px] h-[26px]"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 32 32"
      version="1.1"
    >
      <title>stackoverflow</title>
      <path d="M8.696 23.002v2.662h13.321v-2.662h-13.321zM3.366 20.336v10.659h23.981v-10.659h-2.666v7.994h-18.652v-7.993h-2.663zM9.483 16.928l-0.55 2.616 13.087 2.75 0.55-2.614-13.087-2.753zM11.795 10.855l-1.131 2.424 12.124 5.645 1.13-2.424zM15.731 5.276l-1.711 2.054 10.278 8.56 1.711-2.054zM20.655 1.004l-2.149 1.596 7.985 10.732 2.144-1.596z" />
    </svg>
  )
}

const LinkedIn = ({ width, height }) => {
  return (
    <svg
      className="w-[30px] h-[30px] mercado-match"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-supported-dps="24x24"
      fill="currentColor"
      width={width}
      height={height}
      focusable="false"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
    </svg>
  )
}

const externalPosts = [
  {
    date: 'May 2019',
    link: 'https://github.com/avremel/lucene',
    text: 'Simple Search Engine',
    external: true,
  },
  {
    date: 'Apr 2018',
    link: 'https://medium.com/@avremelk/solr-gottchas-a-tutorial-a953c8b3e775',
    text: 'Solr + Python — A Tutorial',
    external: true,
  },
  {
    date: 'Jan 2018',
    link: 'https://medium.com/@avremelk/practical-redux-course-1aeb74bd01aa',
    text: 'Practical Redux Course',
    external: true,
  },
]

const NavItem = ({ date, link, text, external = false }) => {
  return (
    <li className="leading-6">
      <a
        href={link}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="underline underline-offset-4 decoration-slate-300 lg:text-xl lg:underline-offset-8"
      >
        {text}
      </a>
      <div className="text-slate-500 text-xs mt-2 lg:text-sm">{date}</div>
    </li>
  )
}

const Home = ({ posts }) => {
  const baseUrl = 'https://www.avikaminetzky.dev'
  const profileImageUrl = '/media/profile.png'
  const getAbsoluteAssetUrl = (assetPath) => {
    if (!assetPath) return undefined
    if (/^https?:\/\//i.test(assetPath)) return assetPath
    if (assetPath.startsWith('/')) return `${baseUrl}${assetPath}`
    return `${baseUrl}/${assetPath}`
  }
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'avi kaminetzky on software',
    description: 'Notes on software engineering, search, and frontend architecture.',
    url: baseUrl,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Avi Kaminetzky',
      url: baseUrl,
      sameAs: [
        'https://www.linkedin.com/in/avi-dev/',
        'https://stackoverflow.com/users/4822174/avi-kaminetzky',
        'https://github.com/avremel',
        'https://x.com/avikaminetzky',
      ],
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `${baseUrl}/posts/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: 'Avi Kaminetzky',
      },
      image: getAbsoluteAssetUrl(post.ogImage),
    })),
  }

  return (
    <>
      <Head>
        <title>avi kaminetzky on software</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeSchema),
          }}
        />
      </Head>

      <div className="text-slate-700 flex flex-col h-screen p-10 lg:max-w-screen-md lg:mx-auto">
        <header className="mb-6 lg:mb-10">
          <div className="flex items-center gap-4 lg:gap-6">
            <img
              src={profileImageUrl}
              alt="Avi Kaminetzky profile"
              className="h-[96px] w-auto shrink-0 rounded-sm lg:h-[200px]"
              loading="eager"
            />

            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl leading-none tracking-tight">
                  <span className="text-slate-800 block lg:inline">avi kaminetzky</span>
                  <span className="text-slate-500 block lg:inline lg:ml-1">on software</span>
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/avi-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn />

                  <VisuallyHidden>LinkedIn Link</VisuallyHidden>
                </a>

                <a
                  href="https://stackoverflow.com/users/4822174/avi-kaminetzky"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StackOverflow />

                  <VisuallyHidden>StackOverflow Link</VisuallyHidden>
                </a>

                <a
                  href="https://github.com/avremel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon className="w-[26px] h-[26px]" />

                  <VisuallyHidden>Github Link</VisuallyHidden>
                </a>
              </div>
            </div>
          </div>
        </header>

        <ul className="flex flex-col gap-4 overflow-y-auto pb-2">
          {posts.map((post) => (
            <NavItem
              key={post.slug}
              date={post.date}
              link={`/posts/${post.slug}`}
              text={post.title}
            />
          ))}

          {externalPosts.map((post) => (
            <NavItem
              key={post.link}
              date={post.date}
              link={post.link}
              text={post.text}
              external={post.external}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      posts: getAllPostsMeta(),
    },
  }
}

export default Home
