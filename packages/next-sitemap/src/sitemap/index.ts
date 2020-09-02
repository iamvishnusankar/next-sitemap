/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConfig } from '../interface'
import { exportFile } from '../file'

export const withXMLTemplate = (content: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`
}

export const buildSitemapXml = (config: IConfig, urls: string[]): string => {
  const content = urls.reduce((prev, curr) => {
    const value = config.transform!(config, curr)

    // Add location prop
    let filed = value.url ? `<loc>${value.url}</loc>` : ''

    // Add change frequency
    filed += value.changefreq
      ? `<changefreq>${value.changefreq}</changefreq>`
      : ''

    // Add priority
    filed += value.priority ? `<priority>${value.priority}</priority>` : ''

    // Add lastmod
    filed += value.lastmod ? `<lastmod>${value.lastmod}</lastmod>` : ''

    // Create url filed based on field values
    filed = filed ? `<url>${filed}</url>` : ''

    // Append previous value and return
    return `${prev}${filed}\n`
  }, '')

  return withXMLTemplate(content)
}

export const generateSitemap = (
  config: IConfig,
  path: string,
  urls: string[]
): void => {
  const sitemapXml = buildSitemapXml(config, urls)
  exportFile(path, sitemapXml)
}
