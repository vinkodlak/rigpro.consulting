import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeaderHome from '../components/HeaderHome'
import Container from '../components/Container'
import logoBlue from '../img/logo-blue.svg'
import styled from 'styled-components'

const H1Img = styled.h1`
  margin: 0 0 50px;
  text-align: center;
`
const LogoText = styled.div`
  width: 686px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 716px) {
    width: initial;
  }
`

export const IndexPageTemplate = ({ data }) => {

  return (
    <Container mt="50">
      <H1Img>
        <img src={logoBlue} alt={data.frontmatter.title}/>
      </H1Img>
      <LogoText dangerouslySetInnerHTML={{ __html: data.html}} />
    </Container>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const IndexPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout
      header={(
        <HeaderHome data={post.frontmatter.mainPitch} />
      )}
    >
      <IndexPageTemplate
        data={post}
      />
    </Layout>
  )

}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const IndexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        mainPitch {
          carousel {
            image {
              publicURL
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
                fixed(height: 630, quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            title
            body
          }
        }
      }
    }
  }
`
