import { ISitemapField, IAlternateRef } from './interface'
import { withXMLTemplate } from './utils/xml'

/**
 * Builder class to generate xml and robots.txt
 * Returns only string values
 */
export class Builder {
  /**
   * Generates sitemap-index.xml
   * @param allSitemaps
   * @returns
   */
  buildSitemapIndexXML(allSitemaps: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allSitemaps
          ?.map((x) => `<sitemap><loc>${x}</loc></sitemap>`)
          .join('\n')}
        </sitemapindex>`
  }

  /**
   * Generates sitemap.xml
   * @param fields
   * @returns
   */
  buildSitemapXml(fields: ISitemapField[]): string {
    const content = fields
      .map((fieldData) => {
        const field: Array<string> = []

        // Iterate all object keys and key value pair to field-set
        for (const key of Object.keys(fieldData)) {
          // Skip reserved keys
          if (['trailingSlash'].includes(key)) {
            continue
          }

          if (fieldData[key]) {
            if (key !== 'alternateRefs') {
              field.push(`<${key}>${fieldData[key]}</${key}>`)
            } else {
              const altRefField = this.buildAlternateRefsXml(
                fieldData.alternateRefs
              )

              field.push(altRefField)
            }
          }
        }

        // Append previous value and return
        return `<url>${field.join('')}</url>\n`
      })
      .join('')

    return withXMLTemplate(content)
  }

  /**
   * Generate alternate refs.xml
   * @param alternateRefs
   * @returns
   */
  buildAlternateRefsXml(alternateRefs: Array<IAlternateRef> = []): string {
    return alternateRefs
      .map((alternateRef) => {
        return `<xhtml:link rel="alternate" hreflang="${alternateRef.hreflang}" href="${alternateRef.href}"/>`
      })
      .join('')
  }
}
