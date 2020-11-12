/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from 'path'
import {
  ISitemapChunk,
  IConfig,
  IRuntimePaths,
  ISitemapFiled,
} from '../interface'
import minimist from 'minimist'
import fs from 'fs'

export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment)
}

export const resolveSitemapChunks = (
  baseSitemapPath: string,
  chunks: ISitemapFiled[][]
): ISitemapChunk[] => {
  const folder = path.dirname(baseSitemapPath)
  return chunks.map((chunk, index) => {
    const filename = `sitemap${index > 0 ? `-${index}` : ''}.xml`

    return {
      path: `${folder}/${filename}`,
      fields: chunk,
      filename,
    }
  })
}

export const getRuntimePaths = (config: IConfig): IRuntimePaths => {
  return {
    BUILD_MANIFEST: getPath(config.sourceDir!, 'build-manifest.json'),
    PRERENDER_MANIFEST: getPath(config.sourceDir!, 'prerender-manifest.json'),
    EXPORT_MARKER: getPath(config.sourceDir!, 'export-marker.json'),
    SITEMAP_FILE: getPath(config.outDir!, 'sitemap.xml'),
    ROBOTS_TXT_FILE: getPath(config.outDir!, 'robots.txt'),
  }
}

/**
 * @deprecated Use getConfigFilePath instead
 */
export const KNOWN_PATHS = {
  CONFIG_FILE: getPath('next-sitemap.js'),
}

export const getConfigFilePath = () => {
  const args = minimist(process.argv.slice(2))
  const configPath = getPath(args.config || 'next-sitemap.js')

  if (!fs.existsSync(configPath)) {
    throw new Error(`${configPath} does not exist.`)
  }

  return configPath
}
