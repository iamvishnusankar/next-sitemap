'use client'

import React from 'react'

interface CardItemProps {
  href: string
  title?: string
  description?: string
}

const CardItem: React.FC<CardItemProps> = ({ href, title, description }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <h1 className="dark:text-neutral-300 dark:hover:text-white font-satoshiBold text-xl">
        {title}
      </h1>
      <h2 className="mt-5 text-slate-600 dark:text-neutral-500 hover:text-slate-800 font-ranadeMedium">
        {description}
      </h2>
    </a>
  )
}

export default CardItem
