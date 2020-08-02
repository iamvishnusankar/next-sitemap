import { loadConfig } from './config'
import { loadManifest } from './manifest'
import { createUrlSet } from './url'
import { buildSitemapXml } from './buildSitemapXml'
import { exportSitemap } from './export'

const config = loadConfig()
const manifest = loadManifest()
const urlSet = createUrlSet(config, manifest)

const sitemapPath = config.path
const sitemapXml = buildSitemapXml(config, [...urlSet])

exportSitemap(sitemapPath, sitemapXml)
