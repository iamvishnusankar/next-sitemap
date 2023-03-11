/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  IConfig,
  IExportable,
  INextSitemapResult,
  IRuntimePaths,
  ISitemapField,
} from '../interface.js'
import { SitemapBuilder } from './sitemap-builder.js'
import path from 'node:path'
import { generateUrl } from '../utils/url.js'
import { combineMerge } from '../utils/merge.js'
import { RobotsTxtBuilder } from './robots-txt-builder.js'
import { defaultRobotsTxtTransformer } from '../utils/defaults.js'
import { exportFile } from '../utils/file.js'

export class ExportableBuilder {
  exportableList: IExportable[] = []

  config: IConfig

  runtimePaths: IRuntimePaths

  sitemapBuilder: SitemapBuilder

  robotsTxtBuilder: RobotsTxtBuilder

  exportDir: string

  constructor(config: IConfig, runtimePaths: IRuntimePaths) {
    this.config = config

    this.runtimePaths = runtimePaths

    this.sitemapBuilder = new SitemapBuilder()

    this.robotsTxtBuilder = new RobotsTxtBuilder()

    this.exportDir = path.resolve(process.cwd(), this.config.outDir!)
  }

  /**
   * Register sitemap index files
   */
  async registerIndexSitemap() {
    // Get generated sitemap list
    const sitemaps = [
      ...this.generatedSitemaps(),
      // Include additionalSitemaps provided via robots.txt options
      ...(this.config?.robotsTxtOptions?.additionalSitemaps ?? []),
    ]

    const sitemapIndexLastmod = this.config?.sitemapIndexLastmod || false

    // Generate sitemap-index content
    const content = this.sitemapBuilder.buildSitemapIndexXml(sitemaps, sitemapIndexLastmod)

    // Create exportable
    const item: IExportable = {
      type: 'sitemap-index',
      filename: this.runtimePaths.SITEMAP_INDEX_FILE!,
      url: this.runtimePaths.SITEMAP_INDEX_URL!,
      content,
    }

    // Add to exportable list
    this.exportableList.push(item)
  }

  /**
   * Resolve filename if index sitemap is generated
   * @param index
   * @returns
   */
  resolveFilenameWithIndexSitemap(index: number) {
    return `${this.config.sitemapBaseFileName}-${index}.xml`
  }

  /**
   * Resolve filename if index sitemaps is not generated
   * @param index
   * @returns
   */
  resolveFilenameWithoutIndexSitemap(index: number) {
    if (index === 0) {
      return `${this.config.sitemapBaseFileName}.xml`
    }

    return this.resolveFilenameWithIndexSitemap(index)
  }

  /**
   * Register sitemaps with exportable builder
   * @param chunks
   */
  async registerSitemaps(chunks: ISitemapField[][]) {
    // Check whether user config allows sitemap generation
    const hasIndexSitemap = this.config.generateIndexSitemap

    // Create exportable items
    const items = chunks?.map((chunk, index) => {
      // Get sitemap base filename
      const baseFilename = hasIndexSitemap
        ? this.resolveFilenameWithIndexSitemap(index)
        : this.resolveFilenameWithoutIndexSitemap(index)

      return {
        type: 'sitemap',
        url: generateUrl(this.config.siteUrl, baseFilename),
        filename: path.resolve(this.exportDir, baseFilename),
        content: this.sitemapBuilder.buildSitemapXml(chunk),
      } as IExportable
    })

    // Add to exportable list
    this.exportableList.push(...items)
  }

  /**
   * Get robots.txt export config
   * @returns
   */
  robotsTxtExportConfig() {
    // Endpoints list
    const endpoints: string[] = []

    // Include non-index sitemaps
    // Optionally allow user to include non-index sitemaps along with generated sitemap list
    // Set to true if index-sitemap is not generated
    const includeNonIndexSitemaps = this.config.generateIndexSitemap
      ? this.config?.robotsTxtOptions?.includeNonIndexSitemaps
      : true

    // Add all sitemap indices
    if (this.config.generateIndexSitemap) {
      endpoints.push(...this.generatedSitemapIndices())
    }

    // Add all non-index sitemaps
    if (includeNonIndexSitemaps) {
      endpoints.push(...this.generatedSitemaps())
    }

    // Combine merge with additional sitemaps
    return combineMerge(
      {
        robotsTxtOptions: {
          additionalSitemaps: endpoints,
        },
      } as IConfig,
      this.config
    )
  }

  /**
   * Register robots.txt export
   */
  async registerRobotsTxt() {
    // File name of robots.txt
    const baseFilename = 'robots.txt'

    // Export config of robots.txt
    const robotsConfig = this.robotsTxtExportConfig()

    // Generate robots content
    let content = this.robotsTxtBuilder.generateRobotsTxt(robotsConfig)

    // Get robots transformer
    const robotsTransformer =
      robotsConfig?.robotsTxtOptions?.transformRobotsTxt ??
      defaultRobotsTxtTransformer

    // Transform generated robots txt
    content = await robotsTransformer(robotsConfig, content)

    // Generate exportable item
    const item: IExportable = {
      type: 'robots.txt',
      filename: path.resolve(this.exportDir, baseFilename),
      url: generateUrl(robotsConfig?.siteUrl, baseFilename),
      content,
    }

    // Add to exportableList
    this.exportableList.push(item)
  }

  /**
   * Generic reducer to extract by type
   * @param condition
   * @returns
   */
  exportableUrlReducer(condition: (curr: IExportable) => boolean) {
    return this.exportableList.reduce<string[]>((prev, curr) => {
      const matches = condition(curr)

      if (matches) {
        prev.push(curr.url)
      }

      return prev
    }, [])
  }

  /**
   * Return a lit of sitemap urls
   * @returns
   */
  generatedSitemaps() {
    return this.exportableUrlReducer((x) => x.type == 'sitemap')
  }

  /**
   * Generate sitemap indices
   * @returns
   */
  generatedSitemapIndices() {
    return this.exportableUrlReducer((x) => x.type == 'sitemap-index')
  }

  /**
   * Export all registered files
   * @returns
   */
  async exportAll(): Promise<INextSitemapResult> {
    await Promise.all(
      this.exportableList?.map(async (item) =>
        exportFile(item.filename, item.content)
      )
    )

    // Create result object
    return {
      runtimePaths: this.runtimePaths,
      sitemaps: this.generatedSitemaps(),
      sitemapIndices: this.generatedSitemapIndices(),
    }
  }
}
