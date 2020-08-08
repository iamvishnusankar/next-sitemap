import fs from 'fs'
import allPath from '../path'
import { IConfig } from '../interface'
import deepmerge from 'deepmerge'

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

const overwriteMerge = (_: any[], sourceArray: any[], __: any) => sourceArray

export const withDefaultConfig = (config: Partial<IConfig>) =>
  deepmerge(defaultConfig, config, {
    arrayMerge: overwriteMerge,
  })

export const loadConfig = (): IConfig => {
  if (fs.existsSync(allPath.CONFIG_FILE)) {
    const config = require(allPath.CONFIG_FILE)
    return withDefaultConfig(config)
  }

  throw new Error("No config file exist. Please create 'next-sitemap.js'")
}
