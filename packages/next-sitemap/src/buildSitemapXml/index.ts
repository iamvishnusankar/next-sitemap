import { IConfig } from '../interface'
import { prettyXml } from '../pretty'

export const buildSitemapXml = (config: IConfig, urls: string[]) => {
  const urlArr = urls.reduce(
    (prev, curr) => `${prev}
    <url>
    <loc>${curr}</loc>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`,
    ''
  )

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${urlArr}
    </urlset>`

  return prettyXml(sitemapXml, '  ')
}
