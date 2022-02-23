/* eslint-disable @typescript-eslint/no-unused-vars */
import { INextSitemapResult } from '..'
import { exportFile } from '../file'
import type { IRuntimePaths, IConfig } from '../interface'
import { buildSitemapIndexXML } from './build'

/**
 * Export sitemap index file
 * @param runtimePaths
 * @param config
 * @returns
 */
export const exportSitemapIndex = async (result: INextSitemapResult) => {
  // Generate sitemap index content
  const content = buildSitemapIndexXML(result?.generatedSitemaps ?? [])

  // Export file
  return exportFile(result?.runtimePaths.SITEMAP_INDEX_FILE, content)
}
