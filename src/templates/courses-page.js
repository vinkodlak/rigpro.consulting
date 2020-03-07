import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Content, { HTMLContent } from '../components/Content'

export const CoursesPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CoursesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const CoursesPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout
      header={(
        <Header><h1>{post.frontmatter.title}</h1></Header>
      )}
    >
      <CoursesPageTemplate
        content={post.html}
      />
    </Layout>
  )
}

CoursesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CoursesPage

export const coursesPageQuery = graphql`
  query CoursesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
