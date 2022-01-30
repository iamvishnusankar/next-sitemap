/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Load file
 * @param path
 * @param throwError
 * @returns
 */
export const loadFile = async <T>(
  path: string,
  throwError = true
): Promise<T | undefined> => {
  // Get path stat
  const stat = await fs.stat(path)

  // Import and return if the file exist
  if (stat.isFile()) {
    return (await import(path)).default
  }

  // Handle error
  if (throwError) {
    throw new Error(`${path} does not exist.`)
  }
}

/**
 * Export file
 * @param filePath
 * @param content
 * @returns
 */
export const exportFile = async (
  filePath: string,
  content: string
): Promise<any> => {
  // Target folder
  const folder = path.dirname(filePath)

  // Get file stat
  const stat = await fs.stat(folder)

  // Create folder if folder not exist
  if (!stat.isDirectory()) {
    await fs.mkdir(folder)
  }

  return fs.writeFile(filePath, content)
}
