/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ISitemapField } from '../interface'
import { buildSitemapXml } from '../sitemap/build'
import type { GetServerSidePropsContext } from 'next'

export const getServerSideSitemap = async (
  context: GetServerSidePropsContext,
  fields: ISitemapField[]
) => {
  const sitemapContent = buildSitemapXml(fields)

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
