import { loadConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet } from './url'
import { buildSitemapXml } from './buildSitemapXml'
import { exportSitemap } from './export'
import { toChunks } from './array'
import { resolveSitemapChunks } from './path'

const config = loadConfig()
const manifest = loadManifest()
const urlSet = createUrlSet(config, manifest)
const sitemapPath = config.path

if (!!!config.sitemapSize && urlSet.length > 5000) {
  console.warn(
    `WARN: Looks like you have too many links. Consider splitting your sitemap into multiple files by specifying 'sitemapSize' property in next-sitemap.js`
  )
}

export const generateBasicSitemap = (path: string, urls: string[]) => {
  const sitemapXml = buildSitemapXml(config, urls)
  exportSitemap(path, sitemapXml)
}

// Generate Basic sitemap if the chunk size is not specified
if (!!!config.sitemapSize) {
  generateBasicSitemap(sitemapPath, urlSet)
} else {
  // Spile sitemap into multiple files
  const chunks = toChunks(urlSet, config.sitemapSize)
  const sitemapChunks = resolveSitemapChunks(sitemapPath, chunks)

  sitemapChunks.forEach((chunk) => generateBasicSitemap(chunk.path, chunk.urls))
}
