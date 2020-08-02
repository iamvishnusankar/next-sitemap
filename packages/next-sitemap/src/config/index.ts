import fs from 'fs'
import allPath from '../path'
import { IConfig } from '../interface'

export const withDefaultConfig = (config: IConfig) => {
  return {
    path: '/public/sitemap.xml',
    priority: 0.7,
    changefreq: 'daily',
    ...(config as any)
  }
}

export const loadConfig = (): IConfig => {
  if (fs.existsSync(allPath.CONFIG_FILE)) {
    const config = require(allPath.CONFIG_FILE)
    return withDefaultConfig(config)
  }

  throw new Error("No config file exist. Please create 'next.sitemap.js'")
}
