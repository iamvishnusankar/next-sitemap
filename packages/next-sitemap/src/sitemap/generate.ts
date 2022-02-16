import { ISitemapChunk } from '../interface'
import { exportFile } from '../file'
import { buildSitemapXml } from './build'

export const generateSitemap = async (chunk: ISitemapChunk): Promise<any> => {
  const sitemapXml = buildSitemapXml(chunk.fields)
  return exportFile(chunk.path, sitemapXml)
}
