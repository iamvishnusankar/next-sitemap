import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import type { ISitemapField } from '../interface'
import { buildSitemapXml } from '../sitemap/buildSitemapXml'
import { getServerSideSitemap } from './getServerSideSitemap'

describe('Dynamic sitemap generation', () => {
  test('Allows headers to be added', async () => {
    const fields: ISitemapField[] = [
      {
        loc: 'https://example.com',
        lastmod: undefined,
      },
      {
        loc: 'https://example.com',
        lastmod: 'some-value',
      },
    ]

    const write = jest.fn()
    const setHeader = jest.fn()
    const ctx = ({
      req: {} as NextApiRequest,
      res: ({
        write,
        setHeader,
        end: jest.fn(),
      } as unknown) as NextApiResponse,
    } as unknown) as GetServerSidePropsContext

    const cacheHeader = 'max-age=60s'

    const sitemapContent = buildSitemapXml(fields)

    await getServerSideSitemap(ctx, fields, {
      headers: {
        'Cache-Control': cacheHeader,
      },
    })

    expect(write).toHaveBeenCalledWith(sitemapContent)
    expect(setHeader).toHaveBeenCalledWith('Content-Type', 'text/xml')
    expect(setHeader).toHaveBeenCalledWith('Cache-Control', cacheHeader)
  })
})
