import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import GlobalContainer from '../components/Container'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import linkedin from '../img/social/linkedin.svg'
import twitter from '../img/social/twitter.svg'
import bg from '../img/footer-design.svg'

const Footer = styled.footer`
  height: 300px;
  background-image: url(${bg});
  display: grid;
  grid-template-columns: var(--mainGrid);
  grid-gap: var(--gridGap);
  align-items: center;
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
`
const Container = styled(GlobalContainer)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 20px;
`
const Logo = styled.div`
`
const Bar = styled.div`
  align-self: center;
  height: 2px;
  background-color: rgba(255,255,255,0.1);
`
const Social = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 13px;

  a {
    align-self: center;
  }
 
  img {
    width: 1rem;
    height: 1rem;
  }
`

export default () => {
  return (
    <Footer>
      <Container>
        <Logo>
          <Link to={`/`}>
            <img src={logo} alt="RIGPRO Consulting" />
          </Link>
        </Logo>
        <Bar />
        <Social>
          <a title="Facebook" href="https://facebook.com">
            <img src={facebook} alt="Facebook" />
          </a>
          <a title="Twitter" href="https://twitter.com">
            <img className="fas fa-lg" src={twitter} alt="Twitter"
            />
          </a>
          <a title="Linkedin" href="https://linkedin.com">
            <img src={linkedin} alt="Linkedin" />
          </a>
        </Social>
      </Container>
    </Footer>
  )
}

