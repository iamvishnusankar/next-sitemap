import { loadConfigFile } from '../loadConfigFile'
import { loadManifest } from '../manifest'
import { createUrlSet } from '../url'
import { IConfig } from '../interface'

export const buildSiteMap = (config: IConfig, urls: string[]) => {
  const urlArr = urls.reduce(
    (prev, curr) => `${prev}\n 
  <url>
  <loc>${curr}</loc>
  <changefreq>${config.changefreq}</changefreq>
  <priority>${config.priority}</priority>
</url>`,
    ''
  )

  return `<urlset>
  ${urlArr}
  </urlset>`
}

export const generateSitemap = () => {
  const config = loadConfigFile()
  const manifest = loadManifest()
  const urlSet = createUrlSet(config, manifest)

  console.log(urlSet)
}
