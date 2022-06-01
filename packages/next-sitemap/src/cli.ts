/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig, updateWithRuntimeConfig } from './config'
import { exportRobotsTxt } from './robots-txt'
import { exportSitemapIndex } from './sitemap-index/export'
import { INextSitemapResult } from './interface.js'
import { Logger } from './logger.js'
import { createUrlSet } from './utils/url-set.js'
import { generateUrl } from './utils/url.js'
import { getRuntimePaths, resolveSitemapChunks } from './utils/path.js'
import { toChunks } from './utils/array.js'
import { Exporter } from './exporter.js'
import { ConfigParser } from './parsers/config-parser.js'
import { ManifestParser } from './parsers/manifest-parser.js'

// Async main
const main = async () => {
  // Create config parser instance
  const configParser = new ConfigParser()

  // Load base config from `next-sitemap.config.js`
  let config = await configParser.loadBaseConfig()

  // Find the runtime paths using base config
  const runtimePaths = getRuntimePaths(config)

  // Update base config with runtime config
  config = await configParser.withRuntimeConfig(config, runtimePaths)

  // Create manifest parser instance
  const manifestParser = new ManifestParser()

  // Load next.js manifest
  const manifest = await manifestParser.loadManifest(runtimePaths)

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

  // Create exporter instance
  const exporter = new Exporter(loader)

  // Export sitemap index file
  await exporter.exportSitemapIndex(generatedSitemaps)

  // Generate robots.txt
  if (config?.generateRobotsTxt) {
    await exportRobotsTxt(config, result)
  }

  return result
}

// Execute
main().then(Logger.generationCompleted)
