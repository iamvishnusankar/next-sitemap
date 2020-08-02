import fs from 'fs'
import allPath from './path'
import { IConfig } from './interface'

export const loadConfigFile = (): IConfig => {
  if (fs.existsSync(allPath.CONFIG_FILE)) {
    return require(allPath.CONFIG_FILE)
  }

  throw new Error("No config file exist. Please create 'next.sitemap.js'")
}
