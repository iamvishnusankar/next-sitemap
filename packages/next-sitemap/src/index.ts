/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { loadConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet, generateUrl } from './url'
import { buildSitemapXml } from './build-sitemap-xml'
import { exportFile } from './export'
import { toChunks } from './array'
import { resolveSitemapChunks } from './path'
import { generateRobotsTxt } from './robots-txt'

const config = loadConfig()
const manifest = loadManifest()
const urlSet = createUrlSet(config, manifest)
const sitemapPath = `${config.sourceDir}/sitemap.xml`
const robotsTxtFile = `${config.sourceDir}/robots.txt`

export const generateSitemap = (path: string, urls: string[]): void => {
  const sitemapXml = buildSitemapXml(config, urls)
  exportFile(path, sitemapXml)
}

const allSitemaps: string[] = []

// Split sitemap into multiple files
const chunks = toChunks(urlSet, config.sitemapSize!)
const sitemapChunks = resolveSitemapChunks(sitemapPath, chunks)
sitemapChunks.forEach((chunk) => {
  generateSitemap(chunk.path, chunk.urls)
  allSitemaps.push(generateUrl(config.siteUrl, `/${chunk.filename}`))
})

if (config.generateRobotsTxt && config.robotsTxtOptions) {
  // Push the known sitemaps to the additionalSitemapList
  config.robotsTxtOptions.additionalSitemaps = [
    ...allSitemaps,
    ...config.robotsTxtOptions.additionalSitemaps!,
  ]

  const robotsTxt = generateRobotsTxt(config)

  if (robotsTxt) {
    exportFile(robotsTxtFile, robotsTxt)
  }
}
