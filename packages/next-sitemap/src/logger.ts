import type { INextSitemapResult } from './interface.js'

/**
 * Generic console logger
 */
export class Logger {
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
      'Unable to find next-sitemap.js or custom config file.\nIf you are using custom config file, make sure to invoke `next-sitemap --config <custom-config-file>.js`\n'
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
   * @param arg0
   * @param filePath
   */
  static log(emoji: string, ...text: string[]): any {
    return console.log(emoji, `[next-sitemap]`, ...text)
  }

  /**
   * Log stats when the generation is completed
   * @param allSitemaps
   * @returns
   */
  static generationCompleted(result: INextSitemapResult) {
    // Initial stats
    Logger.log(
      `✅`,
      `Generated index sitemap and ${result?.generatedSitemaps?.length} sitemap(s)`
    )

    // Temp assign
    let sitemapsList = [
      result?.runtimePaths?.SITEMAP_INDEX_URL,
      ...(result?.generatedSitemaps ?? []),
    ]

    // Only show 5 entries on console
    if (sitemapsList?.length > 7) {
      sitemapsList = [
        ...sitemapsList.splice(0, 3),
        '...',
        ...sitemapsList.splice(sitemapsList.length - 2, 2),
      ]
    }

    // log all sitemap list
    return sitemapsList?.forEach((x, index) =>
      x === '...'
        ? console.log(`     ${x}`)
        : console.log(`   ○ ${x}`, index === 0 ? '(index)' : '')
    )
  }
}
