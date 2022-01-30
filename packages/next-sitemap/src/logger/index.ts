/**
 * Generic console logger
 */
export class Logger {
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
  static generationCompleted(allSitemaps: string[]) {
    // Initial stats
    Logger.log(
      `✅`,
      `Generated index sitemap and ${allSitemaps?.length - 1} sitemap(s)`
    )

    // Temp assign
    let sitemapsList = allSitemaps

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
