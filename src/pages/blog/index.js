import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Container from '../../components/Container'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const BlogImage = styled.div`
  .gatsby-image-wrapper {
    height: 100%;
    &>div {
      height:100%;
      padding:0;
    }
  }

`
const BlogMeta = styled.div`
  padding: 30px;

  header {
    display: flex;
    align-items: center;
  }
  footer {
    display: flex;
    justify-content: flex-end;
  }
`
const Blog = styled.article`
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  ${BlogImage} {
    grid-column: ${props => props.index % 2 === 0? 2 : 7} / span 5;
    order: ${props => props.index % 2 === 0? 0 : 1};

    @media screen and (max-width: 991px) {
      grid-column: 1 / -1;
      order: 0;
    }

  }
  ${BlogMeta} {
    grid-column: ${props => props.index % 2 === 0? 7 : 2} / span 5;
    order: ${props => props.index % 2 === 0? 1 : 0};
    background-color: ${props => props.index % 2 === 0? 'transparent' : 'var(--lightgray)'};
    
    @media screen and (max-width: 991px) {
      grid-column: 1 / -1;
      order: 1;
    }
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
  flex: 1;
  text-align: right;
`
const Button = styled(Link)`
  display: block;
  width: auto;
  text-transform: initial;
  padding: 8px 50px;
  border: 1px solid var(--gray);
  border-radius: 50px;
  color: var(--blue);
  margin-top: 1em;
  font-size: 18px;
`
const BlogTitle = styled.h2`
  font: 100 30px var(--SegoeUI);
  margin: 20px 0;
  a {
    color: var(--blue);
  }
`
const BlogSubtitle = styled.h3`
  font: 700 18px var(--SegoeUI);
  margin: 0 0 20px;
`

export default ({ data }) => {
  const { 
    blogPosts: { nodes: blogs} 
  } = data

  const niceDate = (date) => {
    const d = new Date(date)
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
  }
  
  return (
    <Layout
      header={(
        <Header><h1>Blog</h1></Header>
      )} 
    >
      <Container mt="100" mb="100">
        {blogs.reverse().map((blog, index) => (
          <Blog key={index} index={index}>
            <BlogImage>
              <Link to={blog.fields.slug}>
                <Img fluid={blog.frontmatter.featuredimage.childImageSharp.fluid} />
              </Link>
            </BlogImage>
            <BlogMeta>
              <header>
                <AuthorImage><Img fixed={blog.frontmatter.authorLink.frontmatter.image.childImageSharp.fixed} /></AuthorImage>
                <Author>{blog.frontmatter.authorLink.frontmatter.name}</Author>
                <Published dateTime={blog.frontmatter.date}>{niceDate(blog.frontmatter.date)}</Published>
              </header>
              <BlogTitle><Link to={blog.fields.slug}>{blog.frontmatter.title}</Link></BlogTitle>
              {blog.frontmatter.subtitle && (
                <BlogSubtitle>{blog.frontmatter.subtitle}</BlogSubtitle>
              )}
              <div>{blog.frontmatter.description}</div>
              <footer><Button to={blog.fields.slug}>Read More</Button></footer>
            </BlogMeta>
          </Blog>
        ))}

      </Container>
    </Layout>
  )
}

export const BlogPageQuery = graphql`
  query BlogPage {
    blogPosts: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "blog-post"}}}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          subtitle
          authorLink {
            frontmatter {
              name
              image {
                childImageSharp {
                  fixed(width:50, height:50, cropFocus:CENTER) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
          featuredimage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          date
          description
        }
        html
      }
    }
  }
`
