import React, { useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import maskRect from '../img/home-mask-right.svg'
import mask from '../img/home-mask.svg'

const Header = styled.div`
display: grid;
grid-template-columns: repeat(48, 1fr);
grid-template-rows: 100px 1fr 61px;
overflow-x: hidden;
min-height: 630px;
position: relative;

@media (max-width: 991px) {
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 1fr) minmax(auto, 1fr);
}
`
const ImageWrap = styled.div`
grid-column: 1 / span 24;
grid-row: 1 / -1;
width: 100%;
height: 100%;
max-height: 630px;
position: relative;
transition: transform 0.7s ease-out;
transform: translate3d(${props => props.active? `-${props.active * 100}%` : 0}, 0, 0);

@media (max-width: 991px) {
  grid-column: 1 / -1;
  grid-row: 1 / span 4;
}
`
const Mask = styled.div`
grid-column: 1 / -1;
grid-row: 1 / -1;
width: 100%;
height: 100%;
z-index:0;

background-image:url(${mask});
background-size: cover;
background-repeat: no-repeat;
background-position-x: 0;
background-position-y: bottom;
position relative;
left: calc(50vw - 455px);

@media (max-width: 991px) {
  background-image: url(${maskRect});
  grid-column: 2 / -2;
  grid-row: 3 / -1;
  left: initial;
}
@media (max-width: 390px) {
  grid-column: 2 / -2;
  margin: 0 -20px;
  padding: 0 20px;
}

`
const TextWrap = styled.div`
grid-column: 25 / span 12;
grid-row: 2 / -1;
position: relative;
align-self: center;
@media (max-width: 991px) {
  grid-column: 3 / -3;
  grid-row: 3 / -1;
  padding: 50px 0;
}
@media (max-width: 390px) {
  grid-column: 2 / -2;
}
display: grid;
`
const Text = styled.div`
color: #fff;
grid-column: 1;
grid-row: 1;
opacity: ${props => props.active? `1` : `0`};
pointer-events: ${props => props.active? `initial` : `none`};
transform: ${props => props.active? `none` : `scale3d(0.95,0.95,1)`};
transition: opacity 0.5s ease, transform 0.5s ease;
transition-delay: ${props => props.active? `0.5s` : `0s`};
`
const Title = styled.div`
  text-transform: uppercase;
  font: 700 55px var(--SegoeUI);
  margin: 25px 0 40px;
  position: relative;
  --barWidth: 50px;

  &:before {
    content: '';
    display: block;
    width: var(--barWidth);
    height: 5px;
    background-color: var(--gray);
    position: absolute;
    top: -25px;
    left: ${props => props.right? `calc(100% - var(--barWidth))` : `0px`};
  }
  @media (max-width: 534px) {
    font-size: 40px;
    --barWidth: 40px;
  }
`
// const Bg = styled.div`
//   background-image: url(${props => props.bg});
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: ${props => props.index * 100}%;
// `
const BG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: ${props => props.index * 100}%;

  .gatsby-image-wrapper {
    width: 100%!important;
    height: 100%!important;
  }
`
const Buttons = styled.div`
  grid-column: 1 / -1;
  grid-row: 3;
  align-self: start;
  justify-self: center;
  z-index: 1;
  display: flex;
  align-items: center;

  @media (max-width: 991px) {
    grid-row: 6;
    align-self: end;
    margin-bottom: 10px;
  }
`
const Button = styled.div`
  cursor: pointer;
  width: 7px;
  height: 7px;
  background-color: ${props => props.active? `#fff` : `var(--gray)`};
  transform: scale3d(${props => props.active? 1.5714 : 1}, ${props => props.active? 1.5714 : 1}, 1);
  border-radius: 50%;
  transition: transform 0.35s, background-color 0.35s;
  &:not(:last-of-type) {
    margin-right: 11px;
  }
`

export default ({ data }) => {
  const arrLength = data.carousel.length
  const [active, setActive] = useState(0)

  const carouselPrev = () => {
    const newActive = active - 1
    setActive(newActive < 0? arrLength-1 : newActive)
  }
  const carouselNext = () => {
    const newActive = active + 1
    setActive(newActive === arrLength? 0 : newActive)
  }
  const carouselIndex = (index) => {
    setActive(index)
  }

  return (
    <Header>
      <ImageWrap active={active}>
        {data.carousel.map((item, index) => (
          // <Bg key={index} bg={item.image.publicURL} index={index} />
          <BG key={index} index={index}>
            <Img fixed={item.image.childImageSharp.fixed} />
          </BG>
        ))}
      </ImageWrap>
      {/* <Image /> */}
      <Mask />
      <TextWrap>
        {data.carousel.map((item, index) => (
          // ref={elRefs[index]}
          <Text key={index} active={index === active}>
            <Title>{item.title}</Title>
            <div dangerouslySetInnerHTML={{ __html: item.body }} />
          </Text>
        ))}
      </TextWrap>
      <Buttons>
        {data.carousel.map((item, index) => (
          <Button key={index} active={index === active} onClick={() => carouselIndex(index)} />
        ))}
      </Buttons>
        {/* <button onClick={carouselNext} style={{cursor: 'pointer', zIndex:100}}>button</button> */}
    </Header>
  )
}