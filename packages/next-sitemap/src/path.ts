import path from 'path'

export const getPath = (rel: string) => {
  return path.resolve(process.cwd(), rel)
}

const allPath = {
  MANIFEST_PATH: getPath('.next/build-manifest.json'),
  CONFIG_FILE: getPath('next.sitemap.js')
}

export default allPath
