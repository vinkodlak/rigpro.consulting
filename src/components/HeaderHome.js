import React from 'react'
import styled from 'styled-components'

import maskRight from '../img/home-mask-right.svg'
import mask from '../img/home-mask.svg'
import image from '../img/consulting_2.jpg'

const Header = styled.div`
display: grid;
grid-template-columns: repeat(48, 1fr);
grid-template-rows: 100px 1fr;
overflow-x: hidden;
min-height: 630px;
position: relative;
z-index:-1;

@media (max-width: 991px) {
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 1fr) minmax(auto, 1fr);
}
`
const Image = styled.div`
grid-column: 1 / span 24;
grid-row: 1 / span 2;
width: 100%;
height: 100%;
max-height: 630px;
background-image:url(${image});
background-size: cover;
background-repeat: no-repeat;
background-position-x: center;
background-position-y: center;

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
  grid-row: 4 / -1;
  left: initial;
}
`
const Text = styled.div`
grid-column: 25 / span 12;
grid-row: 2;
align-self: center;
color: #fff;
position: relative;

@media (max-width: 991px) {
  grid-column: 2 / -2;
  grid-row: 4 / -1;
  padding: 75px;
}
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

export default ({ data }) => {
  return (
    <Header>
      <Image />
      <Mask />
      <Text>
        <Title>{data.title}</Title>
        <div>
          { data.body }
        </div>
      </Text>
    </Header>
  )
}