import React from 'react'
import styled from 'styled-components'

import bg from '../img/footer-design.svg'

const Header = styled.header`
height: 300px;
background-image: url(${bg});
background-size: cover;
background-position: left center;
background-repeat: no-repeat;
display: grid;

h1 {
  align-self: end;
  font: 100 40px var(--SegoeUI);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -1px;
  text-align: center;
  margin: 20px auto;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 52px;
    height: 6px;
    background-color: var(--gray);
    position: absolute;
    top: -26px;
    left: calc(50% - 26px);
  }
}
`

export default ({ children }) => {
  return (
    <Header>
      {children}
    </Header>
  )
}