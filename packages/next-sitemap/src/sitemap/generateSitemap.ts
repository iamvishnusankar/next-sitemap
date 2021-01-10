import { ISitemapChunk } from '../interface'
import { exportFile } from '../file'
import { buildSitemapXml } from './buildSitemapXml'

export const generateSitemap = (chunk: ISitemapChunk): void => {
  const sitemapXml = buildSitemapXml(chunk.fields)
  exportFile(chunk.path, sitemapXml)
}
