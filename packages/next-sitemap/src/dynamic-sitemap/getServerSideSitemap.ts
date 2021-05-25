/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ISitemapField } from '../interface'
import { buildSitemapXml } from '../sitemap/buildSitemapXml'

export const getServerSideSitemap = async (
  context: import('next').GetServerSidePropsContext,
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
