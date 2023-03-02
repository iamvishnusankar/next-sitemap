import type { GetServerSidePropsContext } from 'next'

/**
 * Send XML response, supports legacy pages directory
 * @param ctx
 * @param content
 * @returns
 */
export const withXMLResponseLegacy = (
  ctx: GetServerSidePropsContext,
  content: string
) => {
  if (ctx?.res) {
    const { res } = ctx

    // Set header
    res.setHeader('Content-Type', 'text/xml')

    // Write the sitemap context to resonse
    res.write(content)

    // End response
    res.end()
  }

  // Empty props
  return {
    props: {},
  }
}

/**
 * Send XML response, as next13+ route response
 * @param content
 * @returns
 */
export const withXMLResponse = (content: string) => {
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
