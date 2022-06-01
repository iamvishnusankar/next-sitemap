import type { INextSitemapResult, IConfig } from './../interface.js'
import { merge } from '@corex/deepmerge'
import { exportFile } from './../utils/file.js'

/**
 * Robots.txt export config
 * @param config
 * @param result
 * @returns
 */
export const getRobotsTxtExportConfig = (
  config: IConfig,
  result: INextSitemapResult
) => {
  return merge([
    {
      robotsTxtOptions: {
        additionalSitemaps: [
          result?.runtimePaths?.SITEMAP_INDEX_URL, // URL of index sitemap
          ...(config?.robotsTxtOptions?.includeNonIndexSitemaps // Optionally include static generated sitemap files
            ? result?.generatedSitemaps ?? []
            : []),
        ],
      },
    },
    config,
  ])
}

/**
 * Export robots.txt file
 * @param config
 * @param result
 */
export const exportRobotsTxt = async (
  config: IConfig,
  result: INextSitemapResult
): Promise<any> => {
  // Create a config specific for robots.txt
  const exportConfig = getRobotsTxtExportConfig(config, result)

  // Generate robots text
  const robotsTxt = '' //generateRobotsTxt(exportConfig)

  // Create file
  if (robotsTxt) {
    await exportFile(result?.runtimePaths.ROBOTS_TXT_FILE, robotsTxt)
  }
}
