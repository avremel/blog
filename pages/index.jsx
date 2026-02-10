import React from 'react'
import Head from 'next/head'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { VisuallyHidden } from '../components'

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
      className="w-[30px] h-[30px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-supported-dps="24x24"
      fill="currentColor"
      class="mercado-match"
      width={width}
      height={height}
      focusable="false"
    >
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
    </svg>
  )
}

const NavItem = ({ date, link, text, external = false }) => {
  return (
    <li className="flex gap-4 lg:gap-6 leading-6">
      <span className="border-solid border border-slate-300 text-slate-600 p-1 rounded h-fit text-center text-xs flex-shrink-0 basis-24 lg:text-lg lg:basis-32">
        {date}
      </span>
      <a
        href={link}
        target={external ? '_blank' : ''}
        className="underline underline-offset-4 decoration-slate-300 lg:text-xl lg:underline-offset-8"
      >
        {text}
      </a>
    </li>
  )
}

const Home = () => {
  return (
    <>
      <Head>
        <title>avi kaminetzky on software</title>
      </Head>

      <div className="text-slate-700 flex flex-col h-screen p-10 lg:max-w-screen-md lg:mx-auto">
        <header className="mb-6 lg:mb-10 flex justify-between items-center md:flex-col md:items-start md:gap-6">
          <div>
            <h1 className="text-2xl leading-3 lg:text-3xl">avi kaminetzky</h1>

            <h3 className="text-md text-slate-500 leading-6 lg:text-2xl">
              on software
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/avi-dev/" target="_blank">
              <LinkedIn />

              <VisuallyHidden>LinkedIn Link</VisuallyHidden>
            </a>

            <a
              href="https://stackoverflow.com/users/4822174/avi-kaminetzky"
              target="_blank"
            >
              <StackOverflow />

              <VisuallyHidden>StackOverflow Link</VisuallyHidden>
            </a>

            <a href="https://github.com/avremel" target="_blank">
              <GitHubLogoIcon className="w-[26px] h-[26px]" />

              <VisuallyHidden>Github Link</VisuallyHidden>
            </a>
          </div>
        </header>

        <ul className="flex flex-col gap-4 overflow-y-auto pb-2">
          <NavItem
            date="Aug 2024"
            link="/posts/algolia-ecommerce-nextjs"
            text="Algolia + NextJS for Ecommerce"
          />
          <NavItem
            date="Oct 2023"
            link="/posts/ga4-refund-events"
            text="GA4 Offline Refund Events"
          />
          <NavItem
            date="Feb 2022"
            link="/posts/react-flavored-js"
            text="React Flavored Javascript"
          />
          <NavItem
            date="May 2019"
            link="https://github.com/avremel/lucene"
            text="Simple Search Engine"
            external
          />
          <NavItem
            date="Apr 2018"
            link="https://medium.com/@avremelk/solr-gottchas-a-tutorial-a953c8b3e775"
            text="Solr + Python — A Tutorial"
            external
          />
          <NavItem
            date="Jan 2018"
            link="https://medium.com/@avremelk/practical-redux-course-1aeb74bd01aa"
            text="Practical Redux Course"
            external
          />
        </ul>
      </div>
    </>
  )
}

export default Home
