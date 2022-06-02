/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type {
  IConfig,
  IExportable,
  IRuntimePaths,
  ISitemapField,
} from '../interface.js'
import { SitemapBuilder } from './sitemap-builder.js'

export class ExportableBuilder {
  exportableList: IExportable[] = []

  config: IConfig

  runtimePaths: IRuntimePaths

  sitemapBuilder: SitemapBuilder

  constructor(config: IConfig, runtimePaths: IRuntimePaths) {
    this.config = config
    this.runtimePaths = runtimePaths
    this.sitemapBuilder = new SitemapBuilder()
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
   * Register sitemaps with exportable builder
   * @param chunks
   */
  registerSitemaps(chunks: ISitemapField[][]) {
    const items = chunks?.map((chunk, index) => {
      return {
        url: '',
        filename: 'hello',
        content: '',
      } as IExportable
    })

    // this.exportableList.push(...items)
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

  generatedSitemapIndex() {
    return this.exportableUrlReducer((x) => x.type == 'sitemap-index')
  }
}
