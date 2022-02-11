/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig, INextManifest, ISitemapField } from '../../interface'
import {
  isNextInternalUrl,
  generateUrl,
  createDefaultLocaleReplace,
} from '../util'
import { removeIfMatchPattern } from '../../array'
import { transformSitemap } from '../../config'

/**
 * Return UTF-8 encoded urls
 * @param path
 * @returns
 * @link https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap#general-guidelines
 */
export const entityEscapedUrl = (path: string): string =>
  path
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')

export const absoluteUrl = (
  siteUrl: string,
  path: string,
  trailingSlash?: boolean
): string => {
  const url = generateUrl(siteUrl, trailingSlash ? `${path}/` : path)

  if (!trailingSlash && url.endsWith('/')) {
    return url.slice(0, url.length - 1)
  }

  return entityEscapedUrl(url)
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
  const i18n = manifest.routes?.i18n

  const allKeys = [
    ...Object.keys(manifest.build.pages),
    ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
  ]

  // Filter out next.js internal urls and generate urls based on sitemap
  let urlSet = allKeys.filter((x) => !isNextInternalUrl(x))

  // Remove default locale if i18n is enabled
  if (i18n) {
    const { defaultLocale } = i18n
    const replaceDefaultLocale = createDefaultLocaleReplace(defaultLocale)
    urlSet = urlSet.map(replaceDefaultLocale)
  }

  // Remove the urls based on config.exclude array
  if (config.exclude && config.exclude.length > 0) {
    urlSet = removeIfMatchPattern(urlSet, config.exclude)
  }

  urlSet = [...new Set(urlSet)]

  // Create sitemap fields based on transformation
  const sitemapFields: ISitemapField[] = [] // transform using relative urls

  // Create a map of fields by loc to quickly find collisions
  const mapFieldsByLoc: { [key in string]: ISitemapField } = {}

  for (const url of urlSet) {
    const sitemapField = await config.transform!(config, url)

    if (!sitemapField?.loc) continue

    sitemapFields.push(sitemapField)

    // Add link on field to map by loc
    if (config.additionalPaths) {
      mapFieldsByLoc[sitemapField.loc] = sitemapField
    }
  }

  if (config.additionalPaths) {
    const additions =
      (await config.additionalPaths({
        ...config,
        transform: config.transform ?? transformSitemap,
      })) ?? []

    for (const field of additions) {
      if (!field?.loc) continue

      const collision = mapFieldsByLoc[field.loc]

      // Update first entry
      if (collision) {
        // Mutate common entry between sitemapFields and mapFieldsByLoc (spread operator don't work)
        Object.entries(field).forEach(
          ([key, value]) => (collision[key] = value)
        )
        continue
      }

      sitemapFields.push(field)
    }
  }

  return sitemapFields.map((x) => ({
    ...x,
    loc: absoluteUrl(config.siteUrl, x.loc, config.trailingSlash), // create absolute urls based on sitemap fields
    alternateRefs: (x.alternateRefs ?? []).map((alternateRef) => ({
      href: alternateRef.hrefIsAbsolute
        ? alternateRef.href
        : absoluteUrl(alternateRef.href, x.loc, config.trailingSlash),
      hreflang: alternateRef.hreflang,
    })),
  }))
}
