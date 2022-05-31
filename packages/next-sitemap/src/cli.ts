/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig, updateWithRuntimeConfig } from './config'
import { loadManifest } from './manifest'
import { generateSitemap } from './sitemap/generate'
import { exportRobotsTxt } from './robots-txt'
import { exportSitemapIndex } from './sitemap-index/export'
import { INextSitemapResult } from './interface.js'
import { Logger } from './logger.js'
import { createUrlSet } from './utils/url-set.js'
import { generateUrl } from './utils/url.js'
import {
  getConfigFilePath,
  getRuntimePaths,
  resolveSitemapChunks,
} from './utils/path.js'
import { toChunks } from './utils/array.js'

// Async main
const main = async () => {
  // Get config file path
  const configFilePath = await getConfigFilePath()

  // Load next-sitemap.js
  let config = await loadConfig(configFilePath)

  // Get runtime paths
  const runtimePaths = getRuntimePaths(config)

  // Update current config with runtime config
  config = await updateWithRuntimeConfig(config, runtimePaths)

  // Load next.js manifest files
  const manifest = await loadManifest(runtimePaths)

  // Create url-set based on config and manifest
  const urlSet = await createUrlSet(config, manifest)

  // Split sitemap into multiple files
  const chunks = toChunks(urlSet, config.sitemapSize!)
  const sitemapChunks = resolveSitemapChunks(
    runtimePaths.SITEMAP_INDEX_FILE,
    chunks,
    config
  )

  // All sitemaps array to keep track of generated sitemap files.
  // Later to be added on robots.txt
  // Add default index file as first entry of sitemap
  const generatedSitemaps: string[] = []

  // Generate sitemaps from chunks
  await Promise.all(
    sitemapChunks.map(async (chunk) => {
      // Get sitemap absolute url
      const sitemapUrl = generateUrl(config.siteUrl, `/${chunk.filename}`)

      // Add generate sitemap to sitemap list
      generatedSitemaps.push(sitemapUrl)

      // Generate sitemap
      return generateSitemap(chunk)
    })
  )

  // Create result object
  const result: INextSitemapResult = {
    runtimePaths,
    generatedSitemaps,
  }

  // Export sitemap index file
  await exportSitemapIndex(result)

  // Generate robots.txt
  if (config?.generateRobotsTxt) {
    await exportRobotsTxt(config, result)
  }

  return result
}

// Execute
main().then(Logger.generationCompleted)
