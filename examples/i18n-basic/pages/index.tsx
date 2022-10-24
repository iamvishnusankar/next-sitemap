import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const HomePage: React.FC = () => {
  const { locale, locales } = useRouter()

  return (
    <div>
      <h1>HomePage Component: {locale}</h1>

      {locales?.map((item) => (
        <Link key={item} href="/about" locale={item}>
          <button>Go to about: {item}</button>
        </Link>
      ))}
    </div>
  )
}

export default HomePage
