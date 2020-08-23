import { createUrlSet } from '.'
import { sampleConfig } from '../../fixtures/config'
import { sampleManifest } from '../../fixtures/manifest'

describe('next-sitemap/createUrlSet', () => {
  test('without exclusion', () => {
    const urlset = createUrlSet(sampleConfig, sampleManifest)
    expect(urlset).toStrictEqual([
      'https://example.com/',
      'https://example.com/page-0',
      'https://example.com/page-1',
      'https://example.com/page-2',
      'https://example.com/page-3',
    ])
  })

  test('with exclusion', () => {
    const urlset = createUrlSet(
      {
        ...sampleConfig,
        exclude: ['/', '/page-0', '/page-2'],
      },
      sampleManifest
    )

    expect(urlset).toStrictEqual([
      'https://example.com/page-1',
      'https://example.com/page-3',
    ])
  })
})
