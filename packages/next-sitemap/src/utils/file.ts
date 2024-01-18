import * as fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Load file
 * @param path
 * @param throwError
 * @returns
 */
export const loadJSON = async <T>(
  path: string,
  lineDelimited: boolean = false,
): Promise<T | undefined> => {
  // Get path stat
  const stat = await fs.stat(path).catch(() => {
    return {
      isFile: () => false, // Handle errors gracefully
    }
  })

  // Return undefined or throw error
  if (!stat.isFile()) {
    return // Handle errors gracefully
  }

  const jsonString = await fs.readFile(path, { encoding: 'utf-8' })

  if (lineDelimited) {
    const jsonLines = jsonString.split('\n')
    return jsonLines
      .map((line) => {
        if (line.trim().length === 0) {
          return []
        }
        return JSON.parse(line)
      })
      .reduce((accumulator, value) => accumulator.concat(value), [])
  }

  return JSON.parse(jsonString)
}

/**
 * Export file
 * @param filePath
 * @param content
 * @returns
 */
export const exportFile = async (
  filePath: string,
  content: string,
): Promise<any> => {
  // Target folder
  const folder = path.dirname(filePath)

  // Get file stat
  const stat = await fs.stat(folder).catch(() => ({
    isDirectory: () => false,
  }))

  // Directory
  if (!stat.isDirectory()) {
    await fs.mkdir(folder).catch(() => {
      return
    })
  }

  // Write file
  return fs.writeFile(filePath, content)
}
