/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Builder } from '../builder.js'
import type { INextSitemapResult } from '../interface.js'
import { exportFile } from '../utils/file.js'

/**
 * Export sitemap index file
 * @param result
 * @returns
 */
export const exportSitemapIndex = async (result: INextSitemapResult) => {
  // Generate sitemap index content
  const content = new Builder().buildSitemapIndexXML(
    result?.generatedSitemaps ?? []
  )

  // Export file
  return exportFile(`${result?.runtimePaths?.SITEMAP_INDEX_FILE}`, content)
}
