import React, { useState } from 'react'
import { useStaticQuery, graphql } from "gatsby"
// import { useForm, Controller } from 'react-hook-form'
// import { Input, Select, Button } from 'antd'
// import 'antd/es/input/style/css'
// import 'antd/es/select/style/css'
// import 'antd/dist/antd.css'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

// const { Option } = Select 

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: 'initial',
    paddingRight: '50px',
    paddingLeft: '50px',
    border: '1px solid var(--gray)',
    borderRadius: '50px',
    color: 'var(--blue)'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const Contact = styled.div`
  grid-column: 1 / span 2;

  @media (max-width: 991px) {
    grid-column: 1 / span 3;
  }
  @media (max-width: 650px) {
    grid-column: 1 / -1;
  }
`
const Title = styled.h3`
  font: 700 55px var(--SegoeUI);
  margin: 26px 0 40px;
  position: relative;
  text-align: ${props => props.right? `right` : `inherit`};

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
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 34px 0;

  #firstName {
    grid-area: 1 / 1 / 1 / 7;
  }
  #lastName {
    grid-area: 1 / 8 / 1 / -1;
  }
  #businessEmail {
    grid-area: 2 / 1 / 2 / 7;
  }
  #company {
    grid-area: 2 / 8 / 2 / -1;
  }
  #phone {
    grid-area: 3 / 1 / 3 / 7;
  }
  #position {
    grid-area: 3 / 8 / 3 / -1;
  }
  #message {
    grid-area: 4 / 1 / 4 / -1;
  }
  #send {
    grid-area: 5 / 1 / 5 / -1;
    justify-self: end;
  }
`
const ContactWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`
export default () => {
  const data = useStaticQuery(graphql`
    query WebinarRegisterQuery {
      settings: markdownRemark(frontmatter: {templateKey: {eq: "settings-page"}}) {
        frontmatter {
          positions: webinarPositions {
            position
          }
        }
      }
    }
  `)

  const { settings: { frontmatter: { positions }}} = data
  
  const getMailtoUrl = (to, subject, body) => {
      var args = [];
      if (typeof subject !== 'undefined') {
          args.push('subject=' + encodeURIComponent(subject));
      }
      if (typeof body !== 'undefined') {
          args.push('body=' + encodeURIComponent(body))
      }

      var url = 'mailto:' + encodeURIComponent(to);
      if (args.length > 0) {
          url += '?' + args.join('&');
      }
      return url;
  }

  const classes = useStyles()
  const [position, setPosition] = React.useState('');

  const handleChange = event => {
    setPosition(event.target.value)
  }

  return (
    <ContactWrap>
      <Contact>
        <Title>Registration Form</Title>
        <Form action="mailto:webinars@rigpro.earth" method="post" enctype="text/plain">
          <FormControl id="firstName">
            <TextField default="" name="firstName" placeholder="First Name" />
          </FormControl> 
          <FormControl id="lastName">
            <TextField default="" name="lastName" placeholder="Last Name" />
          </FormControl>
          <FormControl id="businessEmail">
            <TextField default="" name="email" placeholder="Business Email" />
          </FormControl>
          <FormControl id="company">
            <TextField default="" name="company" placeholder="Company" />
          </FormControl>
          <FormControl id="phone">
            <TextField default="" name="phone" placeholder="Phone number" />
          </FormControl>
          <FormControl id="position">
            <Select
              name="position"
              mode="multiple"
              displayEmpty 
              value={position}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>Select position</MenuItem>
              {positions.map(({ position }) => (
                <MenuItem key={position} value={position}>{position}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl id="message">
            <TextField default="" name="message" placeholder="Message" />
          </FormControl>

          <Button className={classes.button} id="send" shape="round" type="submit">Send</Button>

        </Form>
      </Contact>
    </ContactWrap>
  )
}