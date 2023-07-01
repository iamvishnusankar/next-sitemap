import { siteExampleConfig } from '@/config/site'
import Card from '../components/cards/card'


export const metadata = {
  title: 'next-sitemap - Examples',
  description: 'Examples where next-sitemap has been utilized.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteExampleConfig.url,
    title: siteExampleConfig.name,
    description: siteExampleConfig.description,
    siteName: siteExampleConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteExampleConfig.name,
    description: siteExampleConfig.description,
    images: [`${siteExampleConfig.url}/examples.jpg`],
    creator: '@iamvishnusankar',
  },
}

const page = () => {
  return (
    <>
      <main className="flex bg-neutral-200 dark:bg-slate-900 relative min-h-[94.5vh] max-w-screen overflow-hidden flex-col items-center justify-center py-12 px-5 xl:p-24 2xl:px-56">
        <div className="lg:mx-[20vw] text-center flex flex-col items-center">
          <div className="border border-slate-500 dark:bg-slate-800 rounded-xl w-fit p-1 px-3 text-sm font-ranadeLight ">
            Working on to transfer examples to /app directory.
          </div>
          <h1 className="mt-10 lg:mt-3 p-5 font-satoshiBlack text-4xl md:text-5xl lg:text-6xl dark:bg-gradient-to-tl dark:from-indigo-900 dark:to-purple-500 bg-clip-text text-transparent bg-gradient-to-bl from-slate-900 to-gray-500">
            Find your Example
          </h1>
          <h2 className="mx-[1vw] text-base md:text-xl text-gray-600 font-ranadeMedium">
            List of examples where next-sitemap has been used.
          </h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-1 md:gap-2 md:grid-cols-2 lg:grid-cols-3 ">
          <Card />
        </div>
      </main>
    </>
  )
}

export default page
