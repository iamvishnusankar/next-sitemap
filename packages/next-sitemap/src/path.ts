import path from 'path'

export const getPath = (rel: string) => {
  return path.resolve(process.cwd(), rel)
}

const allPath = {
  NEXT_MANIFEST: getPath('.next/build-manifest.json'),
  PRERENDER_MANIFEST: getPath('.next/prerender-manifest.json'),
  CONFIG_FILE: getPath('next.sitemap.js')
}

export default allPath
