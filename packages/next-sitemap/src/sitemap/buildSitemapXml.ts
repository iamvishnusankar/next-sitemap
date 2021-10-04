import { AlternateRef, ISitemapField, News } from '../interface'
import { withXMLTemplate } from './withXMLTemplate'

export const buildSitemapXml = (fields: ISitemapField[]): string => {
  const content = fields
    .map((fieldData) => {
      const field: Array<string> = []

      // Iterate all object keys and key value pair to field-set
      for (const key of Object.keys(fieldData)) {
        if (!fieldData[key]) {
          continue
        }

        if (key === 'alternateRefs') {
          field.push(buildAlternateRefsXml(fieldData.alternateRefs))
          continue
        }

        if (key === 'news') {
          field.push(buildNewsXml(fieldData.news))
          continue
        }

        field.push(`<${key}>${fieldData[key]}</${key}>`)
      }

      // Append previous value and return
      return `<url>${field.join('')}</url>\n`
    })
    .join('')

  return withXMLTemplate(content)
}

export const buildAlternateRefsXml = (
  alternateRefs: Array<AlternateRef> = []
): string => {
  return alternateRefs
    .map((alternateRef) => {
      return `<xhtml:link rel="alternate" hreflang="${alternateRef.hreflang}" href="${alternateRef.href}"/>`
    })
    .join('')
}

export const buildNewsXml = (news?: News): string => {
  if (!news) {
    return ''
  }
  return `
     <news:news>
        <news:publication>
          <news:name>${news.publication.name}</news:name>
          <news:language>${news.publication.language}</news:language>
        </news:publication>
        <news:publication_date>${news.publication_date}</news:publication_date>
        <news:title>${news.title}</news:title>
      </news:news>
  `
}
