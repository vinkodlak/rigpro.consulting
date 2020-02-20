import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Workflow from '../components/Workflow'

export const OurWorkflowPageTemplate = ({ title, workflows }) => {
  return (
    <Workflow workflows={workflows} />
  )
}

OurWorkflowPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const OurWorkflowPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout 
      header={(
        <Header><h1>{post.frontmatter.title}</h1></Header>
      )}
    >
      <OurWorkflowPageTemplate
        workflows={post.frontmatter.workflows}
      />
    </Layout>
  )
}

OurWorkflowPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default OurWorkflowPage

export const ourWorkflowPageQuery = graphql`
  query OurWorkflowPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        workflows {
          title
          description
          body
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
