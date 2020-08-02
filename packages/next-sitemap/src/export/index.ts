import fs from 'fs'

export const exportSitemap = (path: string, xml: string) => {
  fs.writeFileSync(path, xml)
}
