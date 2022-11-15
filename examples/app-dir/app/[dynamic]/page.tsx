const DynamicPage: React.FC<any> = ({ params }) => {
  return (
    <div>
      <h1>DynamicPage Component</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  )
}

export default DynamicPage

/**
 * @see https://beta.nextjs.org/docs/api-reference/generate-static-params
 * @returns
 */
export async function generateStaticParams() {
  return [...Array(10000)].map((_, index) => ({
    dynamic: `page-${index}`,
  }))
}
