import fs from 'fs'
import allPath from '../path'
import { IConfig } from '../interface'
import deepmerge from 'deepmerge'

export const defaultConfig: Partial<IConfig> = {
  rootDir: 'public',
  priority: 0.7,
  changefreq: 'daily',
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    additionalSitemaps: []
  }
}

export const withDefaultConfig = (config: IConfig) => deepmerge(defaultConfig, config)

export const loadConfig = (): IConfig => {
  if (fs.existsSync(allPath.CONFIG_FILE)) {
    const config = require(allPath.CONFIG_FILE)
    return withDefaultConfig(config)
  }

  throw new Error("No config file exist. Please create 'next-sitemap.js'")
}
