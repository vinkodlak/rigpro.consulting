import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Arrow from "../img/workflow-button.inline.svg"
import gsap from 'gsap'
import Img from 'gatsby-image'


const Button = styled.div`
  grid-row: var(--gridRow);
  grid-column: 2;
  display: grid;
  align-items: top;
  justify-content: center;
  position: relative;
  z-index:1;

  @media (max-width: 767px) {
    grid-column: 1;
  }
  
  svg {
    position: relative;
    top: 10px;
    z-index: 10;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  &:first-of-type {
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      z-index: 5;
      background-color: #fff;
      height: 100%;
      bottom: calc(100% - 10px - 15px);
    }
  }
  &:last-of-type {
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      z-index: 5;
      background-color: #fff;
      height: 100%;
      top: 25px;
    }
  }
`
const Image = styled.div`
  height: 0;
  overflow: hidden;
`
const Content = styled.div`
  padding: 20px 50px;
`
const Title = styled.h2`
  font: 700 1.125rem var(--SegoeUI);
  margin-bottom: 5px;
`
const Desc = styled.div`
  height: auto;
  overflow: hidden;
`
const Body = styled.div`
  height: 0;
  overflow: hidden;
`
const Workflow = styled.article`
  grid-row: var(--gridRow);
  background-color: #f3f4f6;
  color: #8990aa;
  cursor: pointer;

  h2 {
    color: #125575;
    text-transform: uppercase;
  }

  &:nth-of-type(2n-1) {
    grid-column: 1;
    text-align: right;
    
    &.open+${Button} {
      svg {
        transform: rotate(90deg);
      }
    }
  }
  &:nth-of-type(2n) {
    grid-column: 3;
    text-align: left;
    
    &.open+${Button} {
      svg {
        transform: rotate(-90deg);
      }
    }
  }


  @media (max-width: 767px) {
    &:nth-of-type(2n-1) {
      grid-column: 2;
      text-align: left;
      
      &.open+${Button} {
        svg {
          transform: rotate(-90deg);
        }
      }
    }
    &:nth-of-type(2n) {
      grid-column: 2;
    }
  }

`

const WorkflowItem = ({ image, title, description, body, row }) => {
  const [isOpen, setOpen] = useState(false)
  const imageDiv = useRef(null)
  const descDiv = useRef(null)
  const bodyDiv = useRef(null)
  const toggleOpen = () => {
    setOpen(!isOpen)

    if (!isOpen) {
      gsap.set(imageDiv.current, {height: 'auto'})
      gsap.from(imageDiv.current, {height: 0})

      gsap.to(descDiv.current, {height:0})

      gsap.set(bodyDiv.current, {height: 'auto'})
      gsap.from(bodyDiv.current, {height: 0})
    } else {
      gsap.to(imageDiv.current, {height: 0})
      
      gsap.set(descDiv.current, {height: 'auto' })
      gsap.from(descDiv.current, {height:0 })

      gsap.to(bodyDiv.current, {height: 0})
    }
  }

  return (
    <>
      <Workflow style={{ "--gridRow": row }} className={isOpen && 'open'} onClick={toggleOpen}>
        <Image ref={imageDiv}>
          {(image.childImageSharp && (
            <Img fluid={image.childImageSharp.fluid} alt={title} />
          )) || (
            <img src={image} alt={title} />
          )}
        </Image>
        <Content>
          <Title>{title}</Title>
          <Desc ref={descDiv}>{description}</Desc>
          <Body ref={bodyDiv} dangerouslySetInnerHTML={{ __html: body }} />
        </Content>
      </Workflow>
      <Button style={{ "--gridRow": row }} onClick={toggleOpen}>
        <Arrow />
      </Button>
    </>
  )
}

export default WorkflowItem