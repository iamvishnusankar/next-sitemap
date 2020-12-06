/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig, INextManifest, ISitemapFiled } from '../../interface'
import { isNextInternalUrl, generateUrl } from '../util'
import { removeIfMatchPattern } from '../../array'

/**
 * Create a unique url set
 * @param config
 * @param manifest
 */
export const createUrlSet = (
  config: IConfig,
  manifest: INextManifest
): ISitemapFiled[] => {
  let allKeys = [
    ...Object.keys(manifest.build.pages),
    ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
  ]

  // Remove the urls based on config.exclude array
  if (config?.exclude && config?.exclude.length > 0) {
    allKeys = removeIfMatchPattern(allKeys, config.exclude)
  }

  // Filter out next.js internal urls and generate urls based on sitemap
  let urlSet = allKeys.filter((x) => !isNextInternalUrl(x))

  urlSet = [...new Set(urlSet)]

  // Create sitemap fields based on transformation
  const sitemapFields = urlSet
    .map((url) => config.transform!(config, url)) // transform using relative urls
    .filter((x) => Boolean(x) && Boolean(x.loc)) // remove null values
    .map((x) => ({
      ...x,
      loc: generateUrl(
        config.siteUrl,
        config.trailingSlash ? `${x.loc}/` : x.loc
      ), // create absolute urls based on sitemap fields
    }))

  return sitemapFields
}
