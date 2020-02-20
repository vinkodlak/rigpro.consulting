import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import logo from '../img/logo.svg'

const Container = styled.div`
  height: 100px;
  grid-column: 2 / span 12;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  border-bottom: 2px solid rgba(255,255,255,0.1);
  align-items: center;
`
const Logo = styled.div`
`
const Nav = styled.nav`
position: absolute;
width: 100%;
display: grid;
grid-template-columns: var(--mainGrid);
grid-gap: var(--gridGap);
`
const Login = styled(Link)`
  background-color: #fff;
  color: #125575;
  padding: 12px 70px;
  border-radius: 50px;
  font-weight: 400;
`
const Ul = styled.ul`
  justify-self: end;
  display: flex;

  li {
    font: 700 14px var(--SegoeUI);
    
    a:not(${Login}) {
      text-transform: uppercase;
      padding: 5px;
      color: #fff;
      position: relative;

      &:after {
        content:'';
        pointer-events: none;
        position: absolute;
        display: inline-block;
        height: 2px;
        width: calc(100% - 10px);
        background-color: #fff;
        bottom: -37px;
        left: 5px;
        background-color: rgba(255,255,255,0.5);
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      &.active:after,
      &:hover:after {
        opacity: 1;
      }
    }

    &:not(:last-of-type) {
      margin-right: 40px;
    }
  }
`


export default () => {
  return (
    <Nav>
      <Container>
        <Logo>
          <Link>
            <img src={logo} alt="RIGPRO Consulting" />
          </Link>
        </Logo>
        <Ul>
          <li><Link to={`/`} activeClassName="active">Home</Link></li>
          <li><Link to={`/our-workflow/`} activeClassName="active">Our workflow</Link></li>
          <li><Link to={`/software/`} activeClassName="active">Software</Link></li>
          <li><Link to={`/courses/`} activeClassName="active">Courses</Link></li>
          <li><Link to={`/blog/`} activeClassName="active">Blog</Link></li>
          <li><Link to={`/about/`} activeClassName="active">About</Link></li>
          <li><Login to={`/login/`}>Log In</Login></li>
        </Ul>
      </Container>
    </Nav>
  )
}

