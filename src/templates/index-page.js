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
import Contact from '../components/Contact'

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
const Text = styled.div`
  text-align: ${props => props.right? `right` : `inherit`};
`
const Title = styled.h3`
  font: 700 55px var(--SegoeUI);
  margin: 26px 0 40px;
  position: relative;
  text-align: ${props => props.right? `right` : `inherit`};

  &:before {
    content: '';
    display: block;
    width: 50px;
    height: 5px;
    background-color: var(--gray);
    position: absolute;
    top: -25px;
    left: ${props => props.right? `calc(100% - 50px)` : `0px`};
  }
`
const Image = styled.div`
align-self: center;
`
const Pitch = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr auto auto 1fr;
  grid-gap: 0 var(--gridGapHoriz);

  ${Title} {
    grid-column: ${props => props.index % 2 === 0 ? 1 : 5} / span 8;
    grid-row: 2;
  }

  ${Text} {
    grid-column: ${props => props.index % 2 === 0 ? 1 : 5} / span 8;
    grid-row: 3;
  }

  ${Image} {
    grid-column: ${props => props.index % 2 === 0 ? 9 : 1} / span 4;
    grid-row: 1 / -1;
  }

  @media (max-width: 991px) {
    grid-template-rows: repeat(3, auto);

    ${Title},
    ${Text} {
      grid-column: 1 / -1;
    }
    ${Title} {
      grid-row: 1;
      text-align: center;

      &:before {
        left: calc(50% - 25px);
      }
    }
    ${Image} {
      grid-column: 3 / -3;
      grid-row: 2;
    }
    ${Text} {
      grid-row: 3;
      margin-top: 25px;
      text-align: left;
    }
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
            <Title right={index % 2 !== 0}>{pitch.title}</Title>
            <Text right={index % 2 !== 0} dangerouslySetInnerHTML={{ __html: pitch.body }} />
            <Image>
              <Img fluid={pitch.image.image.childImageSharp.fluid} />
            </Image>
          </Pitch>
        )
        if (index % 2 !== 0) {
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
      {((data.frontmatter.pitches.length % 2 !== 0) && (
        <Container mt="50" mb="50">
          <Contact />
        </Container>
      )) || (
        <Full mt="50">
          <Container>
            <Contact />
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
