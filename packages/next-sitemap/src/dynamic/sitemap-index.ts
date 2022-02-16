import type { GetServerSidePropsContext } from 'next'
import { buildSitemapIndexXML } from '../sitemap-index/build'
import { withXMLResponse } from './response'

/**
 * Generate index sitemaps on server side
 * @param ctx
 * @param sitemaps
 * @returns
 */
export const getServerSideSitemapIndex = async (
  ctx: GetServerSidePropsContext,
  sitemaps: string[]
) => {
  // Generate index sitemap xml content
  const indexContents = buildSitemapIndexXML(sitemaps)

  // Return response
  return withXMLResponse(ctx, indexContents)
}
