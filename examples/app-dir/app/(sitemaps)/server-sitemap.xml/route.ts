/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSideSitemap } from 'next-sitemap'

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemap([
    {
      loc: 'https://example.com',
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: 'https://example.com/dynamic-path-2',
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ])
}
