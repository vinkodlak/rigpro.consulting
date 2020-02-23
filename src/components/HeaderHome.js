import React, { useState, createRef, useEffect } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'

import maskRight from '../img/home-mask-right.svg'
import mask from '../img/home-mask.svg'

const Header = styled.div`
display: grid;
grid-template-columns: repeat(48, 1fr);
grid-template-rows: 100px 1fr;
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
grid-row: 1 / span 2;
width: 100%;
height: 100%;
max-height: 630px;
position: relative;

@media (max-width: 991px) {
  grid-column: 1 / -1;
  grid-row: 1 / span 4;
}
`
const Mask = styled.div`
grid-column: 1 / -1;
grid-row: 1 / span 2;
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
  background-image: url(${maskRight});
  grid-column: 2 / -2;
  grid-row: 3 / -1;
  left: initial;
}
`
const TextWrap = styled.div`
grid-column: 25 / span 12;
grid-row: 2;
position: relative;
align-self: center;
@media (max-width: 991px) {
  grid-column: 3 / -3;
  grid-row: 3 / -1;
  padding: 50px 0;
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
const Bg = styled.div`
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${props => props.index * 100}%;
`

export default ({ data }) => {
  const arrLength = data.carousel.length
  const [active, setActive] = useState(0)
  // const [elRefs, setElRefs] = useState([])

  // useEffect(() => {
  //   setElRefs(elRefs => (
  //     Array(arrLength).fill().map((_, i) => elRefs[i] || createRef())
  //   ));
  // }, [arrLength])

  const carousel = () => {
    const newActive = active + 1
    setActive(newActive == arrLength? 0 : newActive)
  }

  return (
    <Header>
      <ImageWrap>
        {data.carousel.map((item, index) => (
          <Bg key={index} bg={item.image.publicURL} index={index} />
        ))}
      </ImageWrap>
      {/* <Image /> */}
      <Mask />
      <TextWrap>
        {data.carousel.map((item, index) => (
          // ref={elRefs[index]}
          <Text key={index} className="ttt"  active={index == active}>
            <Title>{item.title}</Title>
            <div dangerouslySetInnerHTML={{ __html: item.body }} />
          </Text>
        ))}
        <button onClick={carousel} style={{cursor: 'pointer', zIndex:100}}>button</button>
      </TextWrap>
    </Header>
  )
}