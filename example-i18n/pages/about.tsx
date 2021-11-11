import React from 'react'
import { GetStaticProps } from 'next'

const About: React.FC = () => {
  return (
    <div>
      <h1>About Component</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!['en-US', 'en-NL'].includes(locale)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}

export default About
