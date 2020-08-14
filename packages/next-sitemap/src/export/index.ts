import fs from 'fs'
import path from 'path'

export const exportFile = (filePath: string, content: string): void => {
  const folder = path.dirname(filePath)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  fs.writeFileSync(filePath, content)
}
