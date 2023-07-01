import Footer from './components/Footer'
import Providers from './components/Providers'
import '../styles/globals.css'
import { siteConfig } from '@/config/site'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from '@/app/components/ui/Toaster'

export const metadata = {
  title: 'next-sitemap',
  description: 'Sitemap generator for Next.js application.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@iamvishnusankar',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
