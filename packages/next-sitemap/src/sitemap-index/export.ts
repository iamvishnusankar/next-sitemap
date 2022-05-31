/* eslint-disable @typescript-eslint/no-unused-vars */
import { buildSitemapIndexXML } from '../builder/sitemap-index.js'
import type { INextSitemapResult } from '../interface.js'
import { exportFile } from '../utils/file.js'

/**
 * Export sitemap index file
 * @param result
 * @returns
 */
export const exportSitemapIndex = async (result: INextSitemapResult) => {
  // Generate sitemap index content
  const content = buildSitemapIndexXML(result?.generatedSitemaps ?? [])

  // Export file
  return exportFile(result?.runtimePaths.SITEMAP_INDEX_FILE, content)
}
