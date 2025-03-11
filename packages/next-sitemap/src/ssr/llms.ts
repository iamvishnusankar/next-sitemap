/**
 * This is a TypeScript type import that may require Next.js as a peer dependency.
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
 */
import type { GetServerSidePropsContext } from 'next'
import { withXMLResponseLegacy } from './response.js'
import { LLMsTxtBuilder } from '../builders/llms-txt-builder.js'
import type { IConfig } from '../interface.js'

/**
 * Generate server-side llms.txt content, supports legacy pages directory
 * @param ctx GetServerSidePropsContext
 * @param config Configuration options
 * @returns 
 */
export const getServerSideLLMsTxtLegacy = async (
  ctx: GetServerSidePropsContext,
  config: IConfig
) => {
  // Generate llms.txt content
  const content = new LLMsTxtBuilder().generateLLMsTxt(config)
  
  // Transform content if transformer provided
  const finalContent = config?.llmsTxtOptions?.transformLLMsTxt
    ? await config.llmsTxtOptions.transformLLMsTxt(config, content)
    : content

  // Set content type to text/plain for markdown
  if (ctx?.res) {
    ctx.res.setHeader('Content-Type', 'text/plain')
  }

  // Send response
  return withXMLResponseLegacy(ctx, finalContent)
}

/**
 * Generate server-side llms.txt, supports next13+ route.{ts,js} file
 * To continue using inside pages directory, import `getServerSideLLMsTxtLegacy` instead.
 * @param config Configuration options
 * @param headers Custom request headers
 * @returns Response object
 */
export const getServerSideLLMsTxt = async (
  config: IConfig,
  headers = {}
) => {
  // Generate llms.txt content
  const content = new LLMsTxtBuilder().generateLLMsTxt(config)

  // Transform content if transformer provided  
  const finalContent = config?.llmsTxtOptions?.transformLLMsTxt
    ? await config.llmsTxtOptions.transformLLMsTxt(config, content)
    : content

  // Return response with text/plain for markdown
  return new Response(finalContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      ...headers,
    },
  })
} 