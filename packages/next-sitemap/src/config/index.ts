/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import { IConfig, ISitemapFiled } from '../interface'
import { merge } from '@corex/deepmerge'

export const loadConfig = (path: string): IConfig => {
  if (fs.existsSync(path)) {
    const config = require(path)
    return withDefaultConfig(config)
  }

  throw new Error("No config file exist. Please create 'next-sitemap.js'")
}

export const transformSitemap = (
  config: IConfig,
  url: string
): ISitemapFiled => {
  return {
    loc: url,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }
}

export const defaultConfig: Partial<IConfig> = {
  sourceDir: '.next',
  outDir: 'public',
  priority: 0.7,
  changefreq: 'daily',
  sitemapSize: 5000,
  autoLastmod: true,
  exclude: [],
  transform: transformSitemap,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
}

export const withDefaultConfig = (config: Partial<IConfig>): IConfig => {
  return merge([defaultConfig, config], {
    arrayMergeType: 'overwrite',
  }) as IConfig
}
