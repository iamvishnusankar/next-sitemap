/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INextSitemapResult } from './interface.js'
import { Logger } from './logger.js'
import { getRuntimePaths } from './utils/path.js'
import { toChunks } from './utils/array.js'
import { ConfigParser } from './parsers/config-parser.js'
import { ManifestParser } from './parsers/manifest-parser.js'
import { UrlSetBuilder } from './builders/url-set-builder.js'

export class CLI {
  /**
   * Main method
   * @returns
   */
  async main() {
    // Create config parser instance
    const configParser = new ConfigParser()

    // Load base config from `next-sitemap.config.js`
    let config = await configParser.loadBaseConfig()

    // Find the runtime paths using base config
    const runtimePaths = getRuntimePaths(config)

    // Update base config with runtime config
    config = await configParser.withRuntimeConfig(config, runtimePaths)

    // Create next.js manifest parser instance
    const manifestParser = new ManifestParser()

    // Load next.js manifest
    const manifest = await manifestParser.loadManifest(runtimePaths)

    // Create UrlSetBuilder instance
    const urlSetBuilder = new UrlSetBuilder(config, manifest)

    // Generate url set
    const urlSet = await urlSetBuilder.createUrlSet()

    // Split sitemap into multiple files
    const chunks = toChunks(urlSet, config.sitemapSize!)

    // All sitemaps array to keep track of generated sitemap files.
    // Later to be added on robots.txt
    const generatedSitemaps: string[] = []

    // Generate sitemaps from chunks
    // await Promise.all(
    //   sitemapChunks.map(async (chunk) => {
    //     // Get sitemap absolute url
    //     const sitemapUrl = generateUrl(config.siteUrl, `/${chunk.filename}`)

    //     // Add generate sitemap to sitemap list
    //     generatedSitemaps.push(sitemapUrl)

    //     // Generate sitemap
    //     return generateSitemap(chunk)
    //   })
    // )

    // Create result object
    const result: INextSitemapResult = {
      runtimePaths,
      generatedSitemaps,
    }

    // Generate robots.txt
    if (config?.generateRobotsTxt) {
      //  await exportRobotsTxt(config, result)
    }

    return result
  }

  async execute() {
    // Run main method
    const result = await this.main()

    // Log result
    Logger.generationCompleted(result)
  }
}
