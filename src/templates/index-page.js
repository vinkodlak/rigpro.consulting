import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import HeaderHome from '../components/HeaderHome'
import GlobalFull from '../components/Full'
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
const Full = styled(GlobalFull)`
  padding: 50px 0;
  background-color: var(--lightgray);
`
const Title = styled.h3`
`
const Text = styled.div`
`
const Image = styled.div`
`
const Pitch = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr auto;
  grid-gap: 0 var(--gridGapHoriz);

  ${Title} {
    grid-column: ${props => props.index % 2 === 0 ? 1 : 5} / span 8;
    grid-row: 1;
  }

  ${Text} {
    grid-column: ${props => props.index % 2 === 0 ? 1 : 5} / span 8;
    grid-row: 2;
  }

  ${Image} {
    grid-column: ${props => props.index % 2 === 0 ? 9 : 1} / span 4;
    grid-row: 1 / span 2;
  }

`

export const IndexPageTemplate = ({ data }) => {

  return (
    <>
      <Container mt="50">
        <H1Img>
          <img src={logoBlue} alt={data.frontmatter.title}/>
        </H1Img>
        <LogoText dangerouslySetInnerHTML={{ __html: data.html}} />
      </Container>
      {data.frontmatter.pitches.map((pitch, index) => {
        const MakePitch = () => (
          <Pitch index={index}>
            <Title>{pitch.title}</Title>
            <Text dangerouslySetInnerHTML={{ __html: pitch.body }} />
            <Image>
              <Img fluid={pitch.image.image.childImageSharp.fluid} />
            </Image>
          </Pitch>
        )
        if (index % 2 === 0) {
          return (
            <Container mt="50" key={index}>
              <MakePitch />
            </Container>
          )
        } else {
          return (
            <Full mt="50" key={index}>
              <Container>
                <MakePitch />
              </Container>
            </Full>
          )
        }
      })}
      {((data.frontmatter.pitches.length % 2 === 0) && (
        <Container mt="50" mb="50">
          0
        </Container>
      )) || (
        <Full mt="50">
          <Container>
            1
          </Container>
        </Full>
      )}
    </>
  )
}

IndexPageTemplate.propTypes = {
  title: PropTypes.string,
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
        pitches {
          title
          body
          image {
            altText
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          link {
            url
            text
            newTab
          }
          videoLink {
            url
            text
            newTab
          }
        }  
      }
    }
  }
`
