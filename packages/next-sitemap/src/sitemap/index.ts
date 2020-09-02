/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig, ISitemapFiled } from '../interface'
import { exportFile } from '../file'

export const withXMLTemplate = (content: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`
}

export const buildSitemapXml = (
  config: IConfig,
  fields: ISitemapFiled[]
): string => {
  const content = fields.reduce((prev, curr) => {
    let field = ''
    for (const key of Object.keys(curr)) {
      field += `<${key}>${curr[key]}</${key}>`
    }

    // Append previous value and return
    return `${prev}${field}\n`
  }, '')

  return withXMLTemplate(content)
}

export const generateSitemap = (
  config: IConfig,
  path: string,
  fields: ISitemapFiled[]
): void => {
  const sitemapXml = buildSitemapXml(config, fields)
  exportFile(path, sitemapXml)
}
