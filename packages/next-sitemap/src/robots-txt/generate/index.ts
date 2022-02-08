/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig } from '../../interface'
import { normalizePolicy, addPolicies } from '../policy'

export const generateRobotsTxt = (config: IConfig): string | null => {
  if (!config.generateRobotsTxt) {
    return null
  }

  const { additionalSitemaps, policies } = config.robotsTxtOptions!
  const normalizedPolices = normalizePolicy(policies!)

  let content = ''

  normalizedPolices.forEach((x) => {
    content += `# ${x.userAgent}\nUser-agent: ${x.userAgent}\n`

    if (x.allow) {
      content += `${addPolicies('Allow', x.allow as string[])}`
    }

    if (x.disallow) {
      content += `${addPolicies('Disallow', x.disallow as string[])}`
    }

    if (x.crawlDelay) {
      content += `Crawl-delay: ${x.crawlDelay}\n`
    }

    if (x.cleanParam) {
      content += `${addPolicies('Clean-param', x.cleanParam as string[])}`
    }

    content += '\n'
  })

  // Append host
  content += `# Host\nHost: ${config.siteUrl}\n`

  if (additionalSitemaps && additionalSitemaps.length > 0) {
    content += `\n# Sitemaps\n`

    additionalSitemaps.forEach((x) => {
      content += `Sitemap: ${x}\n`
    })
  }

  return content
}
