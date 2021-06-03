/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ISitemapField } from '../interface'
import { buildSitemapXml } from '../sitemap/buildSitemapXml'

export type GetServerSideSitemapOptions = {
  headers?: Record<string, string | number | readonly string[]>
}

export const getServerSideSitemap = async (
  context: import('next').GetServerSidePropsContext,
  fields: ISitemapField[],
  opts?: GetServerSideSitemapOptions
) => {
  const sitemapContent = buildSitemapXml(fields)

  if (context && context.res) {
    const { res } = context

    if (opts?.headers) {
      for (const [header, value] of Object.entries(opts.headers)) {
        res.setHeader(header, value)
      }
    }

    // Making sure Content-Type is always xml
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
