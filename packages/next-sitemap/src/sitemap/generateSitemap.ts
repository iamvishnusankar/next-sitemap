import { ISitemapChunk } from '../interface'
import { exportFile } from '../file'
import { buildSitemapXml } from './buildSitemapXml'

export const generateSitemap = async (chunk: ISitemapChunk): Promise<any> => {
  const sitemapXml = buildSitemapXml(chunk.fields)
  return exportFile(chunk.path, sitemapXml)
}
