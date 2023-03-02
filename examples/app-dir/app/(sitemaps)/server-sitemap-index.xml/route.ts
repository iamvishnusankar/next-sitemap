/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET(request: Request) {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  return getServerSideSitemapIndex([
    'https://example.com/path-1.xml',
    'https://example.com/path-2.xml',
  ])
}
