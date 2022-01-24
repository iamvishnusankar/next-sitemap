/* eslint-disable @typescript-eslint/no-unused-vars */
import { exportFile } from '../file'
import type { IRuntimePaths, IConfig } from '../interface'
import { generateSitemapIndexXml } from './generate'

export const exportSitemapIndex = (
  runtimePaths: IRuntimePaths,
  config: IConfig,
  allSitemaps: string[]
) => {
  // Remove first entry from allSitemaps (Index sitemap)
  const [indexEntry, ...restSitemaps] = allSitemaps

  const content = generateSitemapIndexXml(restSitemaps)

  return exportFile(runtimePaths.SITEMAP_INDEX_FILE, content)
}
