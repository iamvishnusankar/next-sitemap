/**
 * This is a TypeScript type import that may require Next.js as a peer dependency.
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
 */
import type { GetServerSidePropsContext } from 'next'
import { withXMLResponseLegacy } from './response.js'
import { LLMsTxtBuilder } from '../builders/llms-txt-builder.js'
import type { IConfig, ILLMsTxt } from '../interface.js'

/**
 * Generate server-side llms.txt content, supports legacy pages directory
 * @param ctx GetServerSidePropsContext
 * @param llmsTxtOptions LLMS.txt options
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

  // Send response - note that withXMLResponseLegacy actually just returns the content
  // and we've already set the correct Content-Type header above
  return withXMLResponseLegacy(ctx, finalContent)
}

/**
 * Generate server-side llms.txt, supports next13+ route.{ts,js} file
 * To continue using inside pages directory, import `getServerSideLLMsTxtLegacy` instead.
 * @param config 
 * @param headers Custom request headers
 * @returns 
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