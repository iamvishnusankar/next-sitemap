/* eslint-disable @typescript-eslint/no-unused-vars */
import { exportFile } from '../file'
import type { IRuntimePaths, IConfig } from '../interface'
import { generateSitemapIndexXml } from './generate'

/**
 * Export sitemap index file
 * @param runtimePaths
 * @param config
 * @returns
 */
export const exportSitemapIndex = async (
  runtimePaths: IRuntimePaths,
  config: IConfig
) => {
  // Remove first entry from additionalSitemaps (Index sitemap)
  const [indexEntry, ...restSitemaps] =
    config?.robotsTxtOptions?.additionalSitemaps ?? []

  // Generate sitemap index content
  const content = generateSitemapIndexXml(restSitemaps)

  return exportFile(runtimePaths.SITEMAP_INDEX_FILE, content)
}
