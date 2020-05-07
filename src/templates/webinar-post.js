import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Img from 'gatsby-image'
import ContainerGlobal from '../components/Container'
import GlobalFull from '../components/Full'
import WebinarRegister from '../components/WebinarRegister'


const Full = styled(GlobalFull)`
  background-color: var(--lightgray);
  padding: 50px 0;
`
const Container = styled(ContainerGlobal)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`

const Blog = styled.article`
  grid-column: 2 / -2;
  @media screen and (max-width: 991px) {
    grid-column: 1 / -1;
  }

  header {
    display: flex;
    align-items: center;
  }
`
const AuthorImage = styled.div`
  margin-right: 20px;

  .gatsby-image-wrapper {
    border: 6px solid #fff;
    border-radius: 50%;
    box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.25);
  }
`
const Author = styled.div``
const Published = styled.time`
`
const BlogTitle = styled.h1`
  font: 100 30px var(--SegoeUI);
  margin: 20px 0;
  a {
    color: var(--blue);
  }
`
const BlogSubtitle = styled.h2`
  font: 700 18px var(--SegoeUI);
  margin: 0 0 20px;
`

export default ({ data }) => {
  const { blog } = data
  
  const niceDate = (date) => {
    const d = new Date(date)
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
  }
  
  return (
    <Layout
      header={(
        <Header><span>Webinar</span></Header>
      )} 
    >
      <Container mt="50" mb="50">
        <Blog>
          <header>
            <Published dateTime={blog.frontmatter.date}>{niceDate(blog.frontmatter.date)}</Published>
          </header>
          
          <BlogTitle>{blog.frontmatter.title}</BlogTitle>

          <Img fluid={blog.frontmatter.featuredimage.childImageSharp.fluid} />

          <div dangerouslySetInnerHTML={{ __html: blog.html }} />
        </Blog>
      </Container>

      <Full>
        <ContainerGlobal>
          <WebinarRegister />
        </ContainerGlobal>
      </Full>
    </Layout>
  )
}

export const pageQuery = graphql`
  query WebinarPostByID($id: String!) {
    blog: markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date
        title
        subtitle
        featuredimage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`