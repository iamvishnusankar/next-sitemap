import type { GetServerSidePropsContext } from 'next'
import { buildSitemapIndexXML } from '../sitemap-index/build'

export const getServerSideSitemapIndex = (
  context: GetServerSidePropsContext,
  sitemaps: string[]
) => {
  const sitemapContent = buildSitemapIndexXML(sitemaps)

  if (context && context.res) {
    const { res } = context

    // Set header
    res.setHeader('Content-Type', 'text/xml')

    // Write the sitemap context to resonse
    res.write(sitemapContent)

    // End response
    res.end()
  }

  // Empty props
  return {
    props: {},
  }
}
