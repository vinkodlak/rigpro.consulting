import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Workflow from "../components/Workflow"


export const OurWorkflowPageTemplate = ({ title, workflows, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h1 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h1>

              <Workflow workflows={workflows} />              
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <Layout>
      <OurWorkflowPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
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
