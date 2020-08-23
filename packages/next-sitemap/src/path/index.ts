/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from 'path'
import { ISitemapChunk, IConfig, IRuntimePaths } from '../interface'

export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment)
}

export const resolveSitemapChunks = (
  baseSitemapPath: string,
  chunks: string[][]
): ISitemapChunk[] => {
  const folder = path.dirname(baseSitemapPath)
  return chunks.map((chunk, index) => {
    const filename = `sitemap${index > 0 ? `-${index}` : ''}.xml`

    return {
      path: `${folder}/${filename}`,
      urls: chunk,
      filename,
    }
  })
}

export const getRuntimePaths = (config: IConfig): IRuntimePaths => {
  return {
    BUILD_MANIFEST: getPath(config.sourceDir!, 'build-manifest.json'),
    PRERENDER_MANIFEST: getPath(config.sourceDir!, 'prerender-manifest.json'),
    SITEMAP_FILE: getPath(config.outDir!, 'sitemap.xml'),
    ROBOTS_TXT_FILE: getPath(config.outDir!, 'robots.txt'),
  }
}

export const KNOWN_PATHS = {
  CONFIG_FILE: getPath('next-sitemap.js'),
}
