import fs from 'fs'
import allPath from './path'

export const loadBuildManifest = () => {
  if (fs.existsSync(allPath.MANIFEST_PATH)) {
    return require(allPath.MANIFEST_PATH)
  }

  throw new Error('No manifest file exist. Make sure to build the project')
}
