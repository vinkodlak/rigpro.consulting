import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Container from '../components/Container'

import logo from '../img/logo-software.svg'

const TopSection = styled.section`
  text-align: center;
  margin-bottom: 50px;
  img {
    margin-bottom: 50px;
  }
  div {
    width: 686px;
    margin: 0 auto;
    
    @media (max-width: 716px) {
      width: initial;
    }
  }
  
`
const Image = styled.div``
const Parts = styled.div``
const Part1 = styled.div``
const Part2 = styled.div``
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: var(--gridGap);
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 100px;
  }

  &:nth-of-type(2n-1) {
    ${Image} {
      grid-column: 9 / span 4;
      grid-row: 1;
    }
    ${Parts} {
      grid-column: 1 / span 8;
      grid-row: 1;
    }

    @media (max-width: 991px) {
      ${Image} {
        grid-column: 1 / -1;
        grid-row: 1;
      }
      ${Parts} {
        grid-column: 1 / -1;
        grid-row: 2;
      }
    }
  }
  &:nth-of-type(2n) {
    ${Image} {
      grid-column: 1 / span 4;
      grid-row: 1;
    }
    ${Parts} {
      grid-column: 5 / span 7;
      grid-row: 1;
    }

    @media (max-width: 991px) {
      ${Image} {
        grid-column: 1 / -1;
        grid-row: 1;
      }
      ${Parts} {
        grid-column: 1 / -1;
        grid-row: 2;
      }
    }
  }
`

export const SoftwarePageTemplate = ({ content, sections }) => (
  <Container mt="100" mb="100">
    <TopSection>
      <img src={logo} alt=""/>
      <div dangerouslySetInnerHTML={{ __html: content }}/>
    </TopSection>
    <hr />
    {sections.map((section,index) => (
      <Section key={index} className="grid">
        <Image>
          {(section.image.image.childImageSharp && (
            <Img fluid={section.image.image.childImageSharp.fluid} alt={section.image.altText} />
          )) || (
            <img src={section.image.image} alt={section.image.altText} />
          )}
        </Image>
        <Parts>
          <Part1>
            <h2>{section.part1.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.part1.body }} />
          </Part1>
          <Part2>
            <h2>{section.part2.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.part2.body }} />
          </Part2>
        </Parts>
      </Section>
    ))}
  </Container>
)

SoftwarePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const SoftwarePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout
      header={(
        <Header><h1>{post.frontmatter.title}</h1></Header>
      )}
    >
      <SoftwarePageTemplate
        content={post.html}
        sections={post.frontmatter.sections}
      />
    </Layout>
  )
}

SoftwarePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SoftwarePage

export const softwarePageQuery = graphql`
  query SoftwarePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        sections {
          image {
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            altText
          }
          part1 {
            title
            body
          }
          part2 {
            title
            body
          }
        }
      }
    }
  }
`