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

    // log all sitemap list
    return allSitemaps?.forEach((x) => console.log(`   ○ ${x}`))
  }
}
