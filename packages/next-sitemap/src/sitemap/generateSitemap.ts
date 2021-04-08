import {Formatter, ISitemapChunk} from '../interface'
import { exportFile } from '../file'
import { buildSitemapXml } from './buildSitemapXml'

export const generateSitemap = (chunk: ISitemapChunk, formatter?: Formatter): void => {
  const sitemapXml = buildSitemapXml(chunk.fields, formatter)
  exportFile(chunk.path, sitemapXml)
}
