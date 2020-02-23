import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import HeaderHome from '../components/HeaderHome'

export const IndexPageTemplate = ({ title, content }) => {

  return (
    <div></div>
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
        title={post.frontmatter.title}
        content={`kontent`}
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
                fixed {
                  ...GatsbyImageSharpFixed
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
