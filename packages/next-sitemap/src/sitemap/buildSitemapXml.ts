import { ISitemapFiled } from '../interface'
import { withXMLTemplate } from './withXMLTemplate'

export const buildSitemapXml = (fields: ISitemapFiled[]): string => {
  const content = fields.reduce((prev, curr) => {
    let field = ''
    for (const key of Object.keys(curr)) {
      field += `<${key}>${curr[key]}</${key}>`
    }

    // Append previous value and return
    return `${prev}<url>${field}</url>\n`
  }, '')

  return withXMLTemplate(content)
}
