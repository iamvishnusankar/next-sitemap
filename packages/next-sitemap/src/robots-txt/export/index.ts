import { INextSitemapResult } from '../../interface'
import { generateRobotsTxt } from '../generate'
import { exportFile } from '../../file'
import { IConfig } from '../..'
import { merge } from '@corex/deepmerge'

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
 * Export robots txt file
 * @param runtimePaths
 * @param config
 */
export const exportRobotsTxt = async (
  config: IConfig,
  result: INextSitemapResult
): Promise<any> => {
  // Create a config specific for robots.txt
  const exportConfig = getRobotsTxtExportConfig(config, result)

  // Generate robots text
  const robotsTxt = generateRobotsTxt(exportConfig)

  // Create file
  if (robotsTxt) {
    await exportFile(result?.runtimePaths.ROBOTS_TXT_FILE, robotsTxt)
  }
}
