import { loadConfigFile } from './loadConfigFile'

export const generateSitemap = () => {
  const config = loadConfigFile()

  console.log(config)
}
