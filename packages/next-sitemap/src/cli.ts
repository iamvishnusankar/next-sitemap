/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Logger } from './logger.js'
import { toChunks } from './utils/array.js'
import { ConfigParser } from './parsers/config-parser.js'
import { ManifestParser } from './parsers/manifest-parser.js'
import { UrlSetBuilder } from './builders/url-set-builder.js'
import { ExportableBuilder } from './builders/exportable-builder.js'

export class CLI {
  /**
   * Main method
   * @returns
   */
  async main() {
    // Load config from `next-sitemap.config.js` along with runtimePaths info
    const configParser = new ConfigParser()
    const { config, runtimePaths } = await configParser.loadConfig()

    // Load next.js manifest
    const manifestParser = new ManifestParser(config, runtimePaths)
    const manifest = await manifestParser.loadManifest()

    // Generate url set
    const urlSetBuilder = new UrlSetBuilder(config, manifest)
    const urlSet = await urlSetBuilder.createUrlSet()

    // Split sitemap into multiple files
    const chunks = toChunks(urlSet, config.sitemapSize!)

    // Create ExportableBuilder instance
    const expoBuilder = new ExportableBuilder(config, runtimePaths)

    // Register sitemap exports
    await expoBuilder.registerSitemaps(chunks)

    // Register index sitemap if user config allows generation
    if (config.generateIndexSitemap) {
      await expoBuilder.registerIndexSitemap()
    }

    // Register robots.txt export if user config allows generation
    if (config?.generateRobotsTxt) {
      await expoBuilder.registerRobotsTxt()
    }

    // Export all files
    return expoBuilder.exportAll()
  }

  /**
   * Execute and log result
   * @returns
   */
  async execute() {
    return this.main().then(Logger.generationCompleted).catch(Logger.error)
  }
}
