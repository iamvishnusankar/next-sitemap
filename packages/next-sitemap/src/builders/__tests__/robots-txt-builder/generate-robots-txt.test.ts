import { sampleConfig } from '../../../__fixtures__/config.js'
import { RobotsTxtBuilder } from '../../robots-txt-builder.js'

let builder: RobotsTxtBuilder

beforeEach(() => {
  builder = new RobotsTxtBuilder()
})

describe('RobotsTxtBuilder', () => {
  test('generateRobotsTxt: additionalSitemap', () => {
    expect(builder.generateRobotsTxt(sampleConfig as any)).toMatchSnapshot()
  })
})
