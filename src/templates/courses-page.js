import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Link from '../components/Link'
import Layout from '../components/Layout'
import Header from '../components/Header'
import FullGlobal from '../components/Full'

const Full = styled(FullGlobal)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`
const Section = styled.section`
  padding: 50px 1rem;
  text-align: center;
  background-color: ${props => ['#fff', 'var(--lightgray)', 'var(--lightgray2)'][props.index]}
`
const Button = styled(Link)`
  display: inline-block;
  width: auto;
  text-transform: initial;
  padding: 8px 50px;
  border: 1px solid var(--gray);
  border-radius: 50px;
  color: var(--blue);
  margin-top: 1em;
  font-size: 18px;
`
const Title = styled.h2`
  font: 100 30px var(--SegoeUI);
  margin: 26px 0 50px;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 5px;
    background-color: var(--gray);
    position: absolute;
    bottom: -25px;
    left: calc(50% - 25px);
  }
`
const Subtitle = styled.h3`
  margin: 50px 0 25px;
  font: 700 18px var(--SegoeUI);
`

const CoursesPage = ({ data }) => {
  const { courses } = data

  const sections = [
    courses.frontmatter.drillingPersonnel,
    courses.frontmatter.ggPersonnel,
    courses.frontmatter.wirelinePersonnel
  ]

  console.log(sections)

  return (
    <Layout
      header={(
        <Header><h1>{courses.frontmatter.title}</h1></Header>
      )}
    >
      <Full>
        {sections.map((section, index) => (
          <Section key={index} index={index}>
            <Title>{section.title}</Title>
            <Subtitle>{section.subtitle}</Subtitle>
            <div dangerouslySetInnerHTML={{ __html: section.body }} />
            <Button to={section.action.url}>{section.action.text}</Button>
          </Section>
        ))}

      </Full>
    </Layout>
  )
}

CoursesPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CoursesPage

export const coursesPageQuery = graphql`
  query CoursesPage($id: String!) {
    courses: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        drillingPersonnel {
          title
          subtitle
          body
          action {
            text
            url
          }
        }
        ggPersonnel {
          title
          subtitle
          body
          action {
            text
            url
          }
        }
        wirelinePersonnel {
          title
          subtitle
          body
          action {
            text
            url
          }
        }
      }
    }
  }
`
