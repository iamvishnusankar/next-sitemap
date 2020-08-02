import fs from 'fs'
import path from 'path'

export const exportSitemap = (filePath: string, xml: string) => {
  const folder = path.dirname(filePath)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  fs.writeFileSync(filePath, xml)
}
