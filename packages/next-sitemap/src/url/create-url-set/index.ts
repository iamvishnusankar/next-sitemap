import { IConfig, INextManifest } from '../../interface'
import { isNextInternalUrl, generateUrl } from '../util'

/**
 * Create a unique url set
 * @param config
 * @param manifest
 */
export const createUrlSet = (
  config: IConfig,
  manifest: INextManifest
): string[] => {
  const allKeys = [
    ...Object.keys(manifest.build.pages),
    ...(manifest.preRender ? Object.keys(manifest.preRender.routes) : []),
  ]

  const urlSet = new Set(
    allKeys.flatMap((x) =>
      !isNextInternalUrl(x) ? generateUrl(config.siteUrl, x) : []
    )
  )

  return [...urlSet]
}
