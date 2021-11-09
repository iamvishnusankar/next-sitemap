import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

const DynamicPage: React.FC = () => {
  return (
    <div>
      <h1>DynamicPage Component</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  return {
    props: {
      dynamic: params.dynamic,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = [
    { id: 'team', locale: 'en-US' },
    { id: 'team', locale: 'fr' },
    { id: 'team', locale: 'nl-NL' },
    { id: 'careers', locale: 'en-US' },
    { id: 'careers', locale: 'fr' },
    { id: 'careers', locale: 'nl-BE' },
  ];

  return {
    paths: pages.map(({id, locale}) => ({
      params: {
        dynamic: id,
      },
      locale,
    })),
    fallback: false,
  }
}

export default DynamicPage
