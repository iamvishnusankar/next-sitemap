import {ISitemapFields, ISitemapFiled} from '../interface'
import { withXMLTemplate } from './withXMLTemplate'

export const siteMapFieldToXML = (field: ISitemapFields): string | false => {
  // Iterate all object keys and key value pair to field-set
  let res = '';

  Object.entries(field).map(([key, val]) => {
    if (val) {
      switch (typeof val) {
        case "string":
          res += `<${key}>${val}</${key}>`;
          break;
        case "object":
          if(Array.isArray(val)) {
            let [value, attributes] = val;

            if(attributes) {
              attributes = Object.entries(attributes).map(([attr, attrValue]) => `${attr}="${attrValue}"`)
            }

            if(value === null) {
              res += `<${key}${attributes && ' ' + attributes.join(' ')} />`;
            } else {
              res += `<${key}${attributes && ' ' + attributes.join(' ')}>${value}</${key}>`;
            }
          } else {
            res += siteMapFieldToXML(val) || '';
          }
          break;
      }
    }
  });

  return res;
}

export const buildSitemapXml = (fields: ISitemapFiled[]): string => {
  const content = fields.reduce((prev, curr) => {

    // Append previous value and return
    return `${prev}<url>${siteMapFieldToXML(curr)}</url>\n`
  }, '')

  return withXMLTemplate(content)
}
