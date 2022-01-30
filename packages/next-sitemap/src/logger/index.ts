export class Logger {
  /**
   * Log stats when the generation is completed
   * @param allSitemaps
   * @returns
   */
  static generationCompleted(allSitemaps: string[]) {
    // Initial stats
    console.log(
      `✅ [next-sitemap] Generated index sitemap and ${
        allSitemaps?.length - 1
      } sitemap(s)`
    )

    // log all sitemap list
    return allSitemaps?.forEach((x) => console.log(`   ○ ${x}`))
  }
}
