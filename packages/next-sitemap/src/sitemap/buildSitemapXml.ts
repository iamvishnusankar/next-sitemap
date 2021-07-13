import { AlternateRef, ISitemapField } from '../interface'
import { withXMLTemplate } from './withXMLTemplate'

export const buildSitemapXml = (fields: ISitemapField[]): string => {
  const content = fields
    .map((fieldData) => {
      const field: Array<string> = []

      // Iterate all object keys and key value pair to field-set
      for (const key of Object.keys(fieldData)) {
        if (fieldData[key]) {
          if (key === 'alternateRefs') {
            field.push(buildAlternateRefsXml(fieldData.alternateRefs))
          } else if (key === 'alternateUrls') {
            field.push(buildAlternateUrlsXml(fieldData.alternateUrls))
          } else {
            field.push(`<${key}>${fieldData[key]}</${key}>`)
          }
        }
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

export const buildAlternateUrlsXml = (
  alternateUrls: Array<AlternateRef> = []
): string => {
  return alternateUrls
    .map((alternateUrl) => {
      return `<xhtml:link rel="alternate" hreflang="${alternateUrl.hreflang}" href="${alternateUrl.href}"/>`
    })
    .join('')
}
