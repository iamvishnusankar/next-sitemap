import type { GetServerSidePropsContext } from 'next'
import { withXMLResponseLegacy, withXMLResponse } from './response.js'
import { SitemapBuilder } from '../builders/sitemap-builder.js'
import type { ISitemapField } from '../interface.js'

/**
 * Generate server side sitemaps, supports legacy pages directory
 * @param ctx
 * @param fields
 * @returns
 */
export const getServerSideSitemapLegacy = async (
  ctx: GetServerSidePropsContext,
  fields: ISitemapField[]
) => {
  // Generate sitemap xml
  const contents = new SitemapBuilder().buildSitemapXml(fields)

  // Send response
  return withXMLResponseLegacy(ctx, contents)
}

/**
 * Generate server side sitemaps, support next13+ route.{ts,js} file.
 * To continue using pages directory, import `getServerSideSitemapLegacy`.
 * @param fields
 * @param headers Custom request headers
 * @returns
 */
export const getServerSideSitemap = async (
  fields: ISitemapField[],
  headers = {}
) => {
  // Generate sitemap xml
  const contents = new SitemapBuilder().buildSitemapXml(fields)

  // Send response
  return withXMLResponse(contents, headers)
}
