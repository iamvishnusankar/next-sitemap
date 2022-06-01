import type { GetServerSidePropsContext } from 'next'
import { Builder } from '../builder.js'
import { withXMLResponse } from './response.js'

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
  const indexContents = new Builder().buildSitemapIndexXML(sitemaps)

  // Return response
  return withXMLResponse(ctx, indexContents)
}
