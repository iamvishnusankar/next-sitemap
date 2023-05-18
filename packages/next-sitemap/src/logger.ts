import type { INextSitemapResult } from './interface.js'

/**
 * Generic console logger
 */
export class Logger {
  /**
   * Missing build
   */
  static noBuildManifest() {
    Logger.error(
      'Unable to find build-manifest.\nMake sure to build the project using `next build` command\n'
    )
  }

  /**
   * Missing build
   */
  static noExportMarker() {
    Logger.error(
      'Unable to find export-maker.\nMake sure to build the project using `next build` command\n'
    )
  }

  /**
   * Log missing config file
   */
  static noConfigFile() {
    Logger.error(
      'Unable to find next-sitemap.config.js or custom config file.\n\nIMPORTANT: Default config file has been renamed to `next-sitemap.config.js`\n\nIf you are using custom config file, make sure to invoke `next-sitemap --config <custom-config-file>.js`\n'
    )
  }

  /**
   * Generic error logger
   * @param text
   * @returns
   */
  static error(...text: string[]) {
    return console.error(`\x1b[31m`, `❌`, `[next-sitemap]`, ...text)
  }

  /**
   * Generic log
   * @param emoji
   * @param text
   */
  static log(emoji: string, ...text: string[]): any {
    return console.log(emoji, `[next-sitemap]`, ...text)
  }

  static logList(title: string, list: string[]) {
    console.log(
      `-----------------------------------------------------\n`,
      title,
      `\n-----------------------------------------------------\n`
    )

    // Only show 5 entries on console
    if (list?.length > 7) {
      list = [...list.splice(0, 3), '...', ...list.splice(list.length - 2, 2)]
    }

    // log all sitemap list
    list?.forEach((x) =>
      x === '...' ? console.log(`     ${x}`) : console.log(`   ○ ${x}`)
    )

    console.log(`\n`)
  }

  /**
   * Log stats when the generation is completed
   * @param result
   * @returns
   */
  static generationCompleted(result: INextSitemapResult) {
    // Initial stats
    Logger.log(`✅`, 'Generation completed')

    const indexCount = result.sitemapIndices.length
    const sitemapCount = result.sitemaps.length

    console.table({
      indexSitemaps: indexCount,
      sitemaps: sitemapCount,
    })

    // Log sitemap index list
    if (indexCount > 0) {
      Logger.logList('SITEMAP INDICES', result.sitemapIndices)
    }

    // Log sitemap list
    if (sitemapCount > 0) {
      Logger.logList('SITEMAPS', result.sitemaps)
    }
  }
}
