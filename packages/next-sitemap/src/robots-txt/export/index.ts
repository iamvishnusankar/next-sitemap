import { IConfig, IRuntimePaths } from '../../interface'
import { generateRobotsTxt } from '../generate'
import { exportFile } from '../../file'

export const exportRobotsTxt = (
  runtimePaths: IRuntimePaths,
  config: IConfig
): void => {
  // generate robots text
  const robotsTxt = generateRobotsTxt(config)

  // create file
  if (robotsTxt) {
    exportFile(runtimePaths.ROBOTS_TXT_FILE, robotsTxt)
  }
}
