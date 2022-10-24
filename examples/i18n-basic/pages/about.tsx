import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const AboutPage: React.FC = () => {
  const { locale, locales } = useRouter()

  return (
    <div>
      <h1>AboutPage Component: {locale}</h1>
      {locales?.map((item) => (
        <Link key={item} href="/" locale={item}>
          <button>Go to home: {item}</button>
        </Link>
      ))}
    </div>
  )
}

export default AboutPage
