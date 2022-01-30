/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig, getRuntimeConfig, updateConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet, generateUrl } from './url'
import { generateSitemap } from './sitemap/generateSitemap'
import { toChunks } from './array'
import {
  resolveSitemapChunks,
  getRuntimePaths,
  getConfigFilePath,
} from './path'
import { exportRobotsTxt } from './robots-txt'
import { merge } from '@corex/deepmerge'
import { exportSitemapIndex } from './sitemap-index/export'
import { Logger } from './logger'

// Async main
const main = async () => {
  // Get config file path
  const configFilePath = await getConfigFilePath()

  // Load next-sitemap.js
  let config = await loadConfig(configFilePath)

  // Get runtime paths
  const runtimePaths = getRuntimePaths(config)

  // Get runtime config
  const runtimeConfig = await getRuntimeConfig(runtimePaths)

  // Update config with runtime config
  config = updateConfig(config, runtimeConfig)

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
  const allSitemaps: string[] = [runtimePaths.SITEMAP_INDEX_URL]

  // Generate sitemaps from chunks
  await Promise.all(
    sitemapChunks.map(async (chunk) => {
      // Get sitemap absolute url
      const sitemapUrl = generateUrl(config.siteUrl, `/${chunk.filename}`)

      // Add generate sitemap to sitemap list
      allSitemaps.push(sitemapUrl)

      // Generate sitemap
      return generateSitemap(chunk)
    })
  )

  // combine-merge allSitemaps with user-provided additionalSitemaps
  config = merge([
    {
      robotsTxtOptions: {
        additionalSitemaps: allSitemaps,
      },
    },
    config,
  ])

  // Export sitemap index file
  await exportSitemapIndex(runtimePaths, config)

  // Generate robots.txt
  if (config.generateRobotsTxt) {
    await exportRobotsTxt(runtimePaths, config)
  }

  return allSitemaps
}

// Execute
main().then(Logger.generationCompleted)
