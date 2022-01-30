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

// Async main
const main = async () => {
  // Get config file path
  const configFilePath = getConfigFilePath()

  // Load next-sitemap.js
  let config = loadConfig(configFilePath)

  // Get runtime paths
  const runtimePaths = getRuntimePaths(config)

  // get runtime config
  const runtimeConfig = getRuntimeConfig(runtimePaths)

  // Update config with runtime config
  config = updateConfig(config, runtimeConfig)

  // Load next.js manifest files
  const manifest = loadManifest(runtimePaths)

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
  sitemapChunks.forEach((chunk) => {
    generateSitemap(chunk)
    allSitemaps.push(generateUrl(config.siteUrl, `/${chunk.filename}`))
  })

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
  exportSitemapIndex(runtimePaths, config)

  // Generate robots.txt
  if (config.generateRobotsTxt) {
    exportRobotsTxt(runtimePaths, config)
  }
}

// Execute
main()
