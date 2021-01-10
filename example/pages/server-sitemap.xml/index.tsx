/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemap(ctx, [
    {
      loc: 'https://example.com',
      lastmod: new Date().toISOString(),
    },
    {
      loc: 'https://example.com/dynamic-path-2',
      lastmod: new Date().toISOString(),
    },
  ])
}

// Default export to prevent next.js errors
export default () => {}
