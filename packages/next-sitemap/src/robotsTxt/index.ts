import { IConfig } from '../interface'
import { normalizePolicy } from './policy'

export const addPolicies = (key: string, rules: string[]) => {
  return rules.reduce((prev, curr) => `${prev}${key}: ${curr}\n`, '')
}

export const generateRobotsTxt = (config: IConfig) => {
  if (!config.generateRobotsTxt) {
    return null
  }

  const { additionalSitemaps, policies } = config.robotsTxtOptions!
  const normalizedPolices = normalizePolicy(policies!)

  let content = ''

  normalizedPolices.forEach((x) => {
    content += `User-agent: ${x.userAgent}\n`

    if (x.allow) {
      content += `${addPolicies('Allow', x.allow as string[])}`
    }

    if (x.disallow) {
      content += `${addPolicies('Disallow', x.disallow as string[])}`
    }
  })

  // Append host
  content += `Host: ${config.siteUrl}\n`

  additionalSitemaps!.forEach((x) => {
    content += `Sitemap: ${x}\n`
  })

  return content
}
