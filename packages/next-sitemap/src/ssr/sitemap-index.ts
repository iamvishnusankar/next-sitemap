import type { GetServerSidePropsContext } from 'next'
import { SitemapBuilder } from '../builders/sitemap-builder.js'
import { withXMLResponseLegacy, withXMLResponse } from './response.js'

/**
 * Generate index sitemaps on server side, support pages directory
 * @param ctx
 * @param sitemaps
 * @param sitemapIndexLastmod
 * @returns
 */
export const getServerSideSitemapIndexLegacy = async (
  ctx: GetServerSidePropsContext,
  sitemaps: string[],
  sitemapIndexLastmod: boolean | string = false
) => {
  // Generate index sitemap xml content
  const indexContents = new SitemapBuilder().buildSitemapIndexXml(sitemaps, sitemapIndexLastmod)

  // Return response
  return withXMLResponseLegacy(ctx, indexContents)
}

/**
 * Generate index sitemaps on server side, support next13+ route.{ts,js} file.
 * To continue using inside pages directory, import `getServerSideSitemapIndexLegacy` instead.
 * @param sitemaps
 * @param headers Custom request headers
 * @param sitemapIndexLastmod
 * @returns
 */
export const getServerSideSitemapIndex = async (
  sitemaps: string[],
  headers = {},
  sitemapIndexLastmod: boolean | string = false
) => {
  // Generate index sitemap xml content
  const indexContents = new SitemapBuilder().buildSitemapIndexXml(sitemaps, sitemapIndexLastmod)

  // Return response
  return withXMLResponse(indexContents, headers)
}
