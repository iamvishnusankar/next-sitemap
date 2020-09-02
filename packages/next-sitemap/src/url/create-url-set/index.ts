import { IConfig, INextManifest } from '../../interface'
import { isNextInternalUrl, generateUrl } from '../util'
import { removeFromArray } from '../../array'

/**
 * Create a unique url set
 * @param config
 * @param manifest
 */
export const createUrlSet = (
  config: IConfig,
  manifest: INextManifest
): string[] => {
  let allKeys = [
    ...Object.keys(manifest.build.pages),
    ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
  ]

  // Remove the urls based on config.exclude array
  if (config.exclude) {
    allKeys = removeFromArray(allKeys, config.exclude)
  }

  // Filter out next.js internal urls and generate urls based on sitemap
  const urlSet = allKeys
    .filter((x) => !isNextInternalUrl(x))
    .map((x) => generateUrl(config.siteUrl, x))

  return [...new Set(urlSet)]
}
