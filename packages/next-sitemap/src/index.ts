import { loadConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet, generateUrl } from './url'
import { buildSitemapXml } from './buildSitemapXml'
import { exportFile } from './export'
import { toChunks } from './array'
import { resolveSitemapChunks } from './path'
import { generateRobotsTxt } from './robotsTxt'

const config = loadConfig()
const manifest = loadManifest()
const urlSet = createUrlSet(config, manifest)
const sitemapPath = `${config.rootDir}/sitemap.xml`
const robotsTxtFile = `${config.rootDir}/robots.txt`

export const generateSitemap = (path: string, urls: string[]) => {
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

if (config.generateRobotsTxt) {
  // Push the known sitemaps to the additionalSitemapList
  config.robotsTxtOptions!.additionalSitemaps = [
    ...allSitemaps,
    ...config.robotsTxtOptions!.additionalSitemaps!
  ]

  const robotsTxt = generateRobotsTxt(config)
  if (robotsTxt) {
    exportFile(robotsTxtFile, robotsTxt)
  }
}
