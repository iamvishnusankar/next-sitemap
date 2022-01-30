import { IConfig, IRuntimePaths } from '../../interface'
import { generateRobotsTxt } from '../generate'
import { exportFile } from '../../file'

/**
 * Export robots txt file
 * @param runtimePaths
 * @param config
 */
export const exportRobotsTxt = async (
  runtimePaths: IRuntimePaths,
  config: IConfig
): Promise<any> => {
  // Generate robots text
  const robotsTxt = generateRobotsTxt(config)

  // Create file
  if (robotsTxt) {
    await exportFile(runtimePaths.ROBOTS_TXT_FILE, robotsTxt)
  }
}
