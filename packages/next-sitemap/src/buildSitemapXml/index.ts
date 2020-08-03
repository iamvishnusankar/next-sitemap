import { IConfig } from '../interface'

export const withXMLTemplate = (content: string) => {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}</urlset>`
}

export const buildSitemapXml = (config: IConfig, urls: string[]) => {
  const content = urls.reduce(
    (prev, curr) =>
      `${prev}<url><loc>${curr}</loc><changefreq>${config.changefreq}</changefreq><priority>${config.priority}</priority></url>\n`,
    ''
  )

  return withXMLTemplate(content)
}
