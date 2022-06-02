/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  IConfig,
  IExportable,
  IRuntimePaths,
  ISitemapField,
} from '../interface.js'
import { SitemapBuilder } from './sitemap-builder.js'
import path from 'node:path'
import { generateUrl } from '../utils/url.js'

export class ExportableBuilder {
  exportableList: IExportable[] = []

  config: IConfig

  runtimePaths: IRuntimePaths

  sitemapBuilder: SitemapBuilder

  exportFolder: string

  constructor(config: IConfig, runtimePaths: IRuntimePaths) {
    this.config = config

    this.runtimePaths = runtimePaths

    this.sitemapBuilder = new SitemapBuilder()

    this.exportFolder = path.resolve(process.cwd(), this.config.outDir!)
  }

  /**
   * Register sitemap index files
   */
  registerIndexSitemap() {
    // Get generated sitemap list
    const sitemaps = this.generatedSitemaps()

    // Generate sitemap-index content
    const content = this.sitemapBuilder.buildSitemapIndexXml(sitemaps)

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
  registerSitemaps(chunks: ISitemapField[][]) {
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
        filename: path.resolve(this.exportFolder, baseFilename),
        content: this.sitemapBuilder.buildSitemapXml(chunk),
      } as IExportable
    })

    // Add to exportable list
    this.exportableList.push(...items)
  }

  registerRobotsTxt() {
    return
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

  generatedSitemapIndices() {
    return this.exportableUrlReducer((x) => x.type == 'sitemap-index')
  }
}
