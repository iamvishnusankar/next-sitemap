/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig, getRuntimeConfig, updateConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet, generateUrl } from './url'
import { generateSitemap } from './sitemap/generateSitemap'
import { toChunks } from './array'
import {
  resolveSitemapChunks,
  getRuntimePaths,
  getConfigFilePath
} from './path'
import { exportRobotsTxt } from './robots-txt';

// Async main
(async () => {

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
  const sitemapChunks = resolveSitemapChunks(runtimePaths.SITEMAP_FILE, chunks)

  // All sitemaps array to keep track of generated sitemap files.
  // Later to be added on robots.txt
  const allSitemaps: string[] = []

  // Generate sitemaps from chunks
  sitemapChunks.forEach((chunk) => {
    generateSitemap(chunk, config.format)
    allSitemaps.push(generateUrl(config.siteUrl, `/${chunk.filename}`))
  })

  // Generate robots.txt
  if (config.generateRobotsTxt) {
    exportRobotsTxt(runtimePaths, config, allSitemaps)
  }
})()
