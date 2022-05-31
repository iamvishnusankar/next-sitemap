import type { GetServerSidePropsContext } from 'next'
import { withXMLResponse } from './response.js'
import { buildSitemapXml } from '../builder/sitemap.js'
import type { ISitemapField } from '../interface.js'

/**
 * Generate server side sitemaps
 * @param ctx
 * @param fields
 * @returns
 */
export const getServerSideSitemap = async (
  ctx: GetServerSidePropsContext,
  fields: ISitemapField[]
) => {
  // Generate sitemap xml
  const contents = buildSitemapXml(fields)

  return withXMLResponse(ctx, contents)
}
