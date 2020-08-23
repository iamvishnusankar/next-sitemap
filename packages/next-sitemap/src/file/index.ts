/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'

export const loadFile = <T>(path: string, throwError = true): T | undefined => {
  if (fs.existsSync(path)) {
    return require(path) as T
  }

  if (throwError) {
    new Error(`${path} does not exist.`)
  }
}

export const exportFile = (filePath: string, content: string): void => {
  const folder = path.dirname(filePath)
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }

  fs.writeFileSync(filePath, content)
}
