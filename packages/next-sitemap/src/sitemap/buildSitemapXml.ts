import { ISitemapField } from '../interface'
import { withXMLTemplate } from './withXMLTemplate'

export const buildSitemapXml = (fields: ISitemapField[]): string => {
  const content = fields.map(fieldData => {
    const field: Array<string> = [];

    // Iterate all object keys and key value pair to field-set
    for (const key of Object.keys(fieldData)) {
      if (fieldData[key]) {
        field.push(`<${key}>${fieldData[key]}</${key}>`);
      }
    }

    // Append previous value and return
    return `<url>${field.join("")}</url>\n`
  }).join("");

  return withXMLTemplate(content)
}
