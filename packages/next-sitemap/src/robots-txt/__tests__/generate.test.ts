import { generateRobotsTxt } from '../generate.js'
import { sampleConfig } from '../../__fixtures__/config.js'

describe('next-sitemap/generateRobotsTxt', () => {
  test('generateRobotsTxt: generateRobotsTxt false in config', () => {
    expect(
      generateRobotsTxt({
        ...sampleConfig,
        generateRobotsTxt: false,
      } as any)
    ).toBeNull()
  })

  test('generateRobotsTxt: additionalSitemap', () => {
    expect(generateRobotsTxt(sampleConfig as any)).toMatchInlineSnapshot()
  })
})
