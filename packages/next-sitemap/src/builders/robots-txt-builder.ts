/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { IConfig, IRobotPolicy } from '../interface.js'
import { toArray } from '../utils/array.js'

export class RobotsTxtBuilder {
  /**
   * Normalize robots.txt policies
   * @param policies
   * @returns
   */
  normalizePolicy(policies: IRobotPolicy[]): IRobotPolicy[] {
    return policies.map<IRobotPolicy>((x) => ({
      ...x,
      allow: toArray(x.allow ?? []),
      disallow: toArray(x.disallow ?? []),
    }))
  }

  /**
   * Add new policy
   * @param key
   * @param rules
   * @returns
   */
  addPolicies(key: string, rules: string[]): string {
    return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '')
  }

  /**
   * Generates robots.txt content
   * @param config
   * @returns
   */
  generateRobotsTxt(config: IConfig): string {
    const { additionalSitemaps, additionalSitemapsIndex, policies } = config.robotsTxtOptions!
    const normalizedPolices = this.normalizePolicy(policies!)

    let content = ''

    normalizedPolices.forEach((x) => {
      content += `# ${x.userAgent}\nUser-agent: ${x.userAgent}\n`

      if (x.allow) {
        content += `${this.addPolicies('Allow', x.allow as string[])}`
      }

      if (x.disallow) {
        content += `${this.addPolicies('Disallow', x.disallow as string[])}`
      }

      if (x.crawlDelay) {
        content += `Crawl-delay: ${x.crawlDelay}\n`
      }

      content += '\n'
    })

    // Append host
    content += `# Host\nHost: ${config.siteUrl}\n`

    if ((additionalSitemaps && additionalSitemaps.length > 0) || (additionalSitemapsIndex && additionalSitemapsIndex.length > 0)) {
      content += `\n# Sitemaps\n`

      additionalSitemaps?.forEach((x) => {
        content += `Sitemap: ${x}\n`
      })

      additionalSitemapsIndex?.forEach((x) => {
        content += `Sitemap: ${x}\n`
      })
    }

    return content
  }
}
