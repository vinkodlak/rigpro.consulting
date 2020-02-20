import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './style.scss'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import styled from 'styled-components'


const Grid = styled.div`
  display: grid;
  grid-template-columns: var(--mainGrid);
  grid-gap: var(--gridGap);
`
const Container = styled.main`
  grid-column: 2 / span 12;
  margin: 100px 0;
`

const TemplateWrapper = ({ header, children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>

      <Navbar />

      {header}

      <Grid>
        <Container>
          {children}
        </Container>
      </Grid>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
