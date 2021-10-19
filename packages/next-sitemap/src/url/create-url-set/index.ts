/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig, INextManifest, ISitemapField } from '../../interface'
import { isNextInternalUrl, generateUrl } from '../util'
import { removeIfMatchPattern } from '../../array'
import { transformSitemap } from '../../config'

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
      href: absoluteUrl(alternateRef.href, x.loc, config.trailingSlash),
      hreflang: alternateRef.hreflang,
    })),
    alternateUrls: (x.alternateUrls ?? []).map((alternateUrl) => ({
      href: absoluteUrl(alternateUrl.href, '', config.trailingSlash),
      hreflang: alternateUrl.hreflang,
    })),
  }))
}
