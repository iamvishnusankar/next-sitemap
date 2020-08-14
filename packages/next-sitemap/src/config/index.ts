/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import allPath from '../path'
import { IConfig } from '../interface'
import { merge } from '@corex/deepmerge'

export const defaultConfig: Partial<IConfig> = {
  rootDir: 'public',
  priority: 0.7,
  changefreq: 'daily',
  sitemapSize: 5000,
  autoLastmod: true,
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

export const loadConfig = (): IConfig => {
  if (fs.existsSync(allPath.CONFIG_FILE)) {
    const config = require(allPath.CONFIG_FILE)
    return withDefaultConfig(config)
  }

  throw new Error("No config file exist. Please create 'next-sitemap.js'")
}
