import React, { useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import gsap from 'gsap'

import logo from '../img/logo.svg'
import GlobalContainer from '../components/Container'
import { HamburgerSlider } from 'react-animated-burgers'
import bg from '../img/bg-1.png'


const Container = styled(GlobalContainer)`
  height: 100px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  border-bottom: 2px solid rgba(255,255,255,0.1);
  align-items: center;

  @media (max-width: 991px) {
    border-bottom-color: transparent;
  }
`
const Logo = styled.div`
  z-index: 100;
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

  @media (max-width: 1199px) {
    padding: 12px 50px;
  }
`
const Ul = styled.ul`
  @media (max-width: 991px) {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-image: url(${bg});
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    z-index: 10;
    transition: opacity 0.7s ease;

    li {
      margin-right: 0!important;
      margin-bottom: 2rem;
      text-align: center;

      &:first-of-type{
        margin-top: 100px;
      }

      &:last-of-type {
        margin-bottom: 3rem;
      }
    }
    &.is-active {
      opacity: 1;
    }
  }

  justify-self: end;
  display: flex;
  list-style-type: none;

  li {
    font: 700 14px var(--SegoeUI);

    a {
      white-space: nowrap;
    }
    
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

      @media (max-width: 1199px) {
        margin-right: 25px;
      }
    }
  }
`
const Burger = styled.div`
  justify-self: end;
  z-index: 100;
  button:focus {
    outline: none;
  }
  @media (min-width: 992px) {
    display: none;
  }
`


export default () => {
  const [isActive, setActive] = useState(false)
  const navDiv = useRef(null)
  const toggleActive = () => {
    setActive(!isActive)
  }

  return (
    <Nav>
      <Container>
        <Logo>
          <Link>
            <img src={logo} alt="RIGPRO Consulting" />
          </Link>
        </Logo>
        <Ul className={isActive && `is-active`}>
          <li><Link to={`/`} activeClassName="active">Home</Link></li>
          <li><Link to={`/our-workflow/`} activeClassName="active">Our workflow</Link></li>
          <li><Link to={`/software/`} activeClassName="active">Software</Link></li>
          <li><Link to={`/courses/`} activeClassName="active">Courses</Link></li>
          <li><Link to={`/blog/`} activeClassName="active">Blog</Link></li>
          <li><Link to={`/about/`} activeClassName="active">About</Link></li>
          <li><Login to={`/login/`}>Log In</Login></li>
        </Ul>
        <Burger>
          <HamburgerSlider className="menu-burger" barColor="#fff" isActive={isActive} toggleButton={toggleActive} />
        </Burger>
      </Container>
    </Nav>
  )
}

