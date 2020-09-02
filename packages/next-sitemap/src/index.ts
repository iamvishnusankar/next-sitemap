/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet, generateUrl } from './url'
import { generateSitemap } from './sitemap'
import { toChunks } from './array'
import { resolveSitemapChunks, KNOWN_PATHS, getRuntimePaths } from './path'
import { exportRobotsTxt } from './robots-txt'

// Load next-sitemap.js
const config = loadConfig(KNOWN_PATHS.CONFIG_FILE)

// Get runtime paths
const runtimePaths = getRuntimePaths(config)

// Load next.js manifest files
const manifest = loadManifest(runtimePaths)

// Create url-set based on config and manifest
const urlSet = createUrlSet(config, manifest)

// Split sitemap into multiple files
const chunks = toChunks(urlSet, config.sitemapSize!)
const sitemapChunks = resolveSitemapChunks(runtimePaths.SITEMAP_FILE, chunks)

// All sitemaps array to keep track of generated sitemap files.
// Later to be added on robots.txt
const allSitemaps: string[] = []

// Generate sitemaps from chunks
sitemapChunks.forEach((chunk) => {
  generateSitemap(config, chunk.path, chunk.fields)
  allSitemaps.push(generateUrl(config.siteUrl, `/${chunk.filename}`))
})

// Generate robots.txt
if (config.generateRobotsTxt) {
  exportRobotsTxt(runtimePaths, config, allSitemaps)
}
