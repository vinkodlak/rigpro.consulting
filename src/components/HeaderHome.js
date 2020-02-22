import React from 'react'
import styled from 'styled-components'

import mask from '../img/home-mask.svg'
import image from '../img/consulting_2.jpg'

const Header = styled.div`
display: grid;
grid-template-columns: repeat(48, 1fr);
grid-template-rows: 1fr;
`
const Image = styled.div`
grid-column: 1 / span 24;
grid-row: 1;
  img {
    height: 100%;
    width: auto;
    display: block;
  }
`
const Mask = styled.div`
grid-column: 11 / -1;
grid-row: 1;
width: 100%;
height: 100%;

background-image:url(${mask});
background-size: cover;
`
const Text = styled.div`
grid-column: 2;
grid-row: 1;
`

export default ({ data }) => {
  return (
    <Header>
      <Image>
        <img src={image} alt="" />
      </Image>
      <Mask />
      <Text>
        { data.body }
      </Text>
    </Header>
  )
}