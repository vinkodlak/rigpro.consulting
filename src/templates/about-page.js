import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Container from '../components/Container'
import GlobalFull from '../components/Full'

import World from '../img/world.inline.svg'

const Full = styled(GlobalFull)`
  background-color: var(--lightgray);
  padding: 50px 0;
  margin-bottom: 100px;
`
const Title = styled.h2`
  font: 700 55px var(--SegoeUI);
`
const Text = styled.div``
const Section1 = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0 var(--gridGap);
  margin-bottom: 100px;
`
const Experts = styled.div`
  grid-column: 1 / span 2;

  @media (max-width: 991px) {
    grid-column: 1 / span 4;
  }
`
const Section2 = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-gap: var(--gridGap);
  
  ${Title},
  ${Text} {
    grid-column: 3 / span 2;
    text-align: right;
  }

  @media (max-width: 991px) {
    grid-template-rows: repeat(4, auto);

    ${Title} {
      grid-column: 1 / -1;
      grid-row: 1;
    }
    ${Text} {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
`
const Map = styled.div`
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;

  @media (max-width: 991px) {
    grid-column: 1 / span 4;
    grid-row: 3;
  }

  svg {
    max-width: 100%;
    width: 100%;

    ${props => props.countries.map(country => `#${country} { fill: var(--gray); }`)}
  }
`
const Experience = styled.article`
  grid-row: 3;
  @media (max-width: 991px) {
    grid-row: 4;
  }

`
const Section3 = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: var(--gridGap);
  margin-bottom: 100px;

  ${Title},
  ${Text} {
    grid-column: 1 / span 8;

  }

  @media (max-width: 991px) {
    ${Title} {
      grid-column: 1 / -1;
      grid-row: 1;
    }
    
    ${Text} {
      grid-column: 1 / -1;
      grid-row: 3;
    }
  }

`
const CompanyImage = styled.div`
  grid-column: 9 / span 4;

  @media (max-width: 991px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`



export const AboutPageTemplate = ({ section1, section2, section3 }) => (
  <>
    <Container>
      <Section1>
        <Experts>
          <Title>{section1.title}</Title>
          <Text dangerouslySetInnerHTML={{ __html: section1.body }} />
        </Experts>
      </Section1>
    </Container>

    <Full>
      <Container>
        <Section2>
          <Map countries={section2.countries}>
            <World />
          </Map>
          {/* <ExperienceInfo> */}
          <Title>{section2.title}</Title>
          <Text dangerouslySetInnerHTML={{ __html: section2.body }} />
          {/* </ExperienceInfo> */}
          {section2.experiences.map((exp, index) => (
            <Experience key={index} dangerouslySetInnerHTML={{ __html: exp.body }} />
          ))}
        </Section2>
      </Container>
    </Full>

    <Container>
      <Section3>
        <Title>{section3.title}</Title>
        <Text dangerouslySetInnerHTML={{ __html: section3.body }} />
        <CompanyImage>
          {(section3.image.image.childImageSharp && (
            <Img fluid={section3.image.image.childImageSharp.fluid} alt={section3.image.image.title} />
          )) || (
            <img src={section3.image.image.image} alt={section3.image.image.title} />
          )}
        </CompanyImage>
      </Section3>
    </Container>
  </>
)

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout
      header={(
        <Header><h1>{post.frontmatter.title}</h1></Header>
      )}
    >
      <AboutPageTemplate
        section1={post.frontmatter.section1}
        section2={post.frontmatter.section2}
        section3={post.frontmatter.section3}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        section1 {
          title
          body
        }
        section2 {
          title
          body
          countries
          experiences {
            body
          }
        }
        section3 {
          title
          body
          image {
            altText
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
  }
`