import React from 'react'
import { GetStaticProps } from 'next'

const HelloWorld: React.FC = () => {
  return (
    <div>
      <h1>HelloWorld Component</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {

  if (!['en-US', 'fr'].includes(locale)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
    },
  }
}

export default HelloWorld
