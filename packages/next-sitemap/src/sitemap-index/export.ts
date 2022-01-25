/* eslint-disable @typescript-eslint/no-unused-vars */
import { exportFile } from '../file'
import type { IRuntimePaths, IConfig } from '../interface'
import { generateSitemapIndexXml } from './generate'

export const exportSitemapIndex = (
  runtimePaths: IRuntimePaths,
  config: IConfig
) => {
  // Remove first entry from additionalSitemaps (Index sitemap)
  const [indexEntry, ...restSitemaps] =
    config?.robotsTxtOptions?.additionalSitemaps ?? []

  const content = generateSitemapIndexXml(restSitemaps)

  return exportFile(runtimePaths.SITEMAP_INDEX_FILE, content)
}
