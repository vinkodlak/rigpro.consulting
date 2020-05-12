import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Img from 'gatsby-image'
import ContainerGlobal from '../components/Container'
import GlobalFull from '../components/Full'
import WebinarRegister from '../components/WebinarRegister'
import ScrollIntoView from 'react-scroll-into-view'


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
const Published = styled.time`
`
const BlogTitle = styled.h1`
  font: 100 30px var(--SegoeUI);
  margin: 20px 0;
  a {
    color: var(--blue);
  }
`

const BlogHeader = styled.header`
  display: flex;
  justify-content: space-between;

  a {
    color: inherit;
    text-transform: uppercase;
  }
`
const Button = styled.button`
  display: inline-block;
  width: auto;
  text-transform: initial;
  padding: 8px 50px;
  border: 1px solid var(--gray);
  border-radius: 50px;
  color: var(--blue);
  margin: 2.5rem auto 1rem;
  font-size: 18px;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`
const ButtonWrap = styled.div`
  text-align: center;
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
          <BlogHeader>
            <Published dateTime={blog.frontmatter.date}>{niceDate(blog.frontmatter.date)}</Published>
            <Link to="/webinars">Show all webinars</Link>
          </BlogHeader>
          
          <BlogTitle>{blog.frontmatter.title}</BlogTitle>

          <Img fluid={blog.frontmatter.featuredimage.childImageSharp.fluid} />

          <ButtonWrap>
            <ScrollIntoView selector=".register">
              <Button>Register for this webinar</Button>
            </ScrollIntoView>
          </ButtonWrap>

          <div dangerouslySetInnerHTML={{ __html: blog.html }} />
        </Blog>
      </Container>

      <Full className="register">
        <ContainerGlobal>
          <WebinarRegister webinarTitle={blog.frontmatter.title} webinarDate={niceDate(blog.frontmatter.date)} />
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