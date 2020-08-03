import path from 'path'

export const getPath = (rel: string) => {
  return path.resolve(process.cwd(), rel)
}

export const resolveSitemapChunks = (baseSitemapPath: string, chunks: string[][]) => {
  const folder = path.dirname(baseSitemapPath)
  return chunks.map((chunk, index) => ({
    path: `${folder}/sitemap${index > 0 ? `-${index}` : ''}.xml`,
    urls: chunk
  }))
}

const allPath = {
  NEXT_MANIFEST: getPath('.next/build-manifest.json'),
  PRERENDER_MANIFEST: getPath('.next/prerender-manifest.json'),
  CONFIG_FILE: getPath('next-sitemap.js')
}

export default allPath
