import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import {useInput } from '../hooks/useInput'

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
  #email {
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
export default ({webinarTitle, webinarDate}) => {
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
  const { value:firstName, bind:bindFirstName, reset:resetFirstName } = useInput('');
  const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput('');
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:company, bind:bindCompany, reset:resetCompany } = useInput('');
  const { value:phone, bind:bindPhone, reset:resetPhone } = useInput('');
  const { value:message, bind:bindMessage, reset:resetMessage } = useInput('');
  
  const classes = useStyles()
  const [position, setPosition] = React.useState('');

  const handleChange = event => {
    setPosition(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newLine = `%0D%0a`
    const subject = `Webinar registration: ${webinarTitle} ${webinarDate}`
    const body = `First Name: ${escape(firstName)}${newLine}Last Name: ${escape(lastName)}${newLine}Email: ${escape(email)}${newLine}Company: ${escape(company)}${newLine}Phone: ${escape(phone)}${newLine}Position: ${escape(position)}${newLine}Message: ${escape(message)}${newLine}`
    resetFirstName()
    resetLastName()
    resetEmail()
    resetCompany()
    resetPhone()
    resetMessage()
    setPosition('')
    window.location = `mailto:webinars@rigpro.earth?subject=${subject}&body=${body}`
    return false
  }

  return (
    <ContactWrap>
      <Contact>
        <Title>Registration Form</Title>
        <Form onSubmit={handleSubmit} >
          <FormControl id="firstName">
            <TextField {...bindFirstName} name="firstName" placeholder="First Name" required />
          </FormControl> 
          <FormControl id="lastName">
            <TextField {...bindLastName} name="lastName" placeholder="Last Name" required />
          </FormControl>
          <FormControl id="email">
            <TextField {...bindEmail} name="email" placeholder="Business Email" required />
          </FormControl>
          <FormControl id="company">
            <TextField {...bindCompany} name="company" placeholder="Company" required />
          </FormControl>
          <FormControl id="phone">
            <TextField {...bindPhone} name="phone" placeholder="Phone number" required />
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
            <TextField {...bindMessage} name="message" placeholder="Message" required />
          </FormControl>

          <Button className={classes.button} id="send" shape="round" type="submit">Send</Button>

        </Form>
      </Contact>
    </ContactWrap>
  )
}