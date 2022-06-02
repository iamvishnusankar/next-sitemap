/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { INextSitemapResult } from './interface.js'
import { Logger } from './logger.js'
import { getRuntimePaths } from './utils/path.js'
import { toChunks } from './utils/array.js'
import { ConfigParser } from './parsers/config-parser.js'
import { ManifestParser } from './parsers/manifest-parser.js'
import { UrlSetBuilder } from './builders/url-set-builder.js'
import { ExportableBuilder } from './builders/exportable-builder.js'
import { exportFile } from './utils/file.js'

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
    await Promise.all(
      expoBuilder.exportableList?.map(async (item) =>
        exportFile(item.filename, item.content)
      )
    )

    // Create result object
    const result: INextSitemapResult = {
      runtimePaths,
      sitemaps: expoBuilder.generatedSitemaps(),
      sitemapIndices: expoBuilder.generatedSitemapIndices(),
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
