import { ISitemapFiled } from '../interface'
import { withXMLTemplate } from './withXMLTemplate'

export const buildSitemapXml = (fields: ISitemapFiled[]): string => {
  const content = fields.reduce((prev, curr) => {
    let field = ''

    // Iterate all object keys and key value pair to field-set
    for (const key of Object.keys(curr)) {
      if (curr[key]) {
        field += `<${key}>${curr[key]}</${key}>`
      }
    }

    // Append previous value and return
    return `${prev}<url>${field}</url>\n`
  }, '')

  return withXMLTemplate(content)
}
