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
   * @param generatedSitemaps
   * @returns
   */
  async exportSitemapIndex(generatedSitemaps: string[] = []) {
    // Index file path
    const sitemapIndexPath = this.loader.runtimePaths.SITEMAP_INDEX_FILE

    // Return if sitemapIndexPath is empty
    if (!sitemapIndexPath) {
      return
    }

    // Generate sitemap index content
    const content = this.builder.buildSitemapIndexXML(generatedSitemaps)

    // Export file
    return exportFile(sitemapIndexPath, content)
  }
}
