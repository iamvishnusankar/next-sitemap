/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig, INextManifest, ISitemapField } from '../../interface'
import { isNextInternalUrl, generateUrl } from '../util'
import { removeIfMatchPattern } from '../../array'

export const absoluteUrl = (
  siteUrl: string,
  path: string,
  trailingSlash?: boolean
): string => {
  const url = generateUrl(siteUrl, trailingSlash ? `${path}/` : path)

  if (!trailingSlash && url.endsWith('/')) {
    return url.slice(0, url.length - 1)
  }

  return url
}

/**
 * Create a unique url set
 * @param config
 * @param manifest
 */
export const createUrlSet = async (
  config: IConfig,
  manifest: INextManifest
): Promise<ISitemapField[]> => {
  let allKeys = [
    ...Object.keys(manifest.build.pages),
    ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
  ]

  // Remove the urls based on config.exclude array
  if (config.exclude && config.exclude.length > 0) {
    allKeys = removeIfMatchPattern(allKeys, config.exclude)
  }

  // Filter out next.js internal urls and generate urls based on sitemap
  let urlSet = allKeys.filter((x) => !isNextInternalUrl(x))

  urlSet = [...new Set(urlSet)]

  // Create sitemap fields based on transformation
  let sitemapFields: ISitemapField[] = [] // transform using relative urls

  for (const url of urlSet) {
    const sitemapField = await config.transform!(config, url)
    sitemapFields.push(sitemapField)
  }

  sitemapFields = sitemapFields
    .filter((x) => Boolean(x) && Boolean(x.loc)) // remove null values
    .map((x) => ({
      ...x,
      loc: absoluteUrl(config.siteUrl, x.loc, config.trailingSlash), // create absolute urls based on sitemap fields
      alternateRefs: (x.alternateRefs ?? []).map((alternateRef) => ({
        href: absoluteUrl(alternateRef.href, x.loc, config.trailingSlash),
        hreflang: alternateRef.hreflang,
      })),
      alternateUrls: (x.alternateUrls ?? []).map((alternateUrl) => ({
        href: absoluteUrl(alternateUrl.href, '', config.trailingSlash),
        hreflang: alternateUrl.hreflang,
      })),
    }))

  return sitemapFields
}
