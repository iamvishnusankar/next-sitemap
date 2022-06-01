import { Builder } from './builder.js'
import type { IConfig, INextSitemapResult } from './interface.js'
import { Loader } from './loader.js'
import { exportFile } from './utils/file.js'

export class Exporter {
  loader: Loader

  builder: Builder

  constructor(loader: Loader) {
    this.builder = new Builder()
  }

  /**
   * Export sitemap index file
   * @param result
   * @returns
   */
  async exportSitemapIndex(result: INextSitemapResult) {
    // Generate sitemap index content
    const content = this.builder.buildSitemapIndexXML(
      result?.generatedSitemaps ?? []
    )

    // Export file
    return exportFile(result?.runtimePaths.SITEMAP_INDEX_FILE, content)
  }
}
