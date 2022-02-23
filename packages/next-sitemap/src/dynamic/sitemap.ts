import type { ISitemapField } from '../interface'
import { buildSitemapXml } from '../sitemap/build'
import type { GetServerSidePropsContext } from 'next'
import { withXMLResponse } from './response'

export const getServerSideSitemap = async (
  ctx: GetServerSidePropsContext,
  fields: ISitemapField[]
) => {
  // Generate sitemap xml
  const contents = buildSitemapXml(fields)

  return withXMLResponse(ctx, contents)
}
