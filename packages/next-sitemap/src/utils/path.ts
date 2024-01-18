/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import minimist from 'minimist'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Logger } from '../logger.js'
import { generateUrl } from './url.js'
import type { IConfig, IRuntimePaths } from '../interface.js'
import { pathToFileURL } from 'url'

/**
 * Return absolute path from path segments
 * @param pathSegment
 * @returns
 */
export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment)
}

/**
 * Return all runtime paths
 * @param config
 * @returns
 */
export const getRuntimePaths = (config: IConfig): IRuntimePaths => {
  // Check whether user enabled index sitemap or not
  const sitemapIndexEnabled = config?.generateIndexSitemap

  // Set sitemap index file
  const SITEMAP_INDEX_FILE = sitemapIndexEnabled
    ? getPath(config.outDir!, `${config.sitemapBaseFileName}.xml`)
    : undefined

  // Set sitemap index url
  const SITEMAP_INDEX_URL = sitemapIndexEnabled
    ? generateUrl(config?.siteUrl, `${config.sitemapBaseFileName}.xml`)
    : undefined

  return {
    BUILD_MANIFEST: getPath(config.sourceDir!, 'build-manifest.json'),
    PRERENDER_MANIFEST: getPath(config.sourceDir!, 'prerender-manifest.json'),
    ROUTES_MANIFEST: getPath(config.sourceDir!, 'routes-manifest.json'),
    EXPORT_MARKER: getPath(config.sourceDir!, 'export-marker.json'),
    ROBOTS_TXT_FILE: getPath(config.outDir!, 'robots.txt'),
    STATIC_EXPORT_ROOT: getPath(config.outDir!),
    SITEMAP_INDEX_URL,
    SITEMAP_INDEX_FILE,
    TRACE: getPath(config.sourceDir!, 'trace'),
  }
}

/**
 * Get config file path
 * @returns
 */
export const getConfigFilePath = async () => {
  // Extract args from command
  const args = minimist(process.argv.slice(2))

  // Config file path
  const configPath = getPath(args.config || 'next-sitemap.config.js')

  // Check file stat
  return fs
    .stat(configPath)
    .then(() => pathToFileURL(configPath).toString())
    .catch((err) => {
      Logger.noConfigFile()
      throw err
    })
}
