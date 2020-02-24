import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Select, Button } from 'antd'
// import 'antd/es/input/style/css'
// import 'antd/es/select/style/css'
import 'antd/dist/antd.css'
import styled from 'styled-components'

const { Option } = Select 

const Contact = styled.div``
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
  #interest {
    grid-area: 2 / 8 / 2 / -1;
  }
  #message {
    grid-area: 3 / 1 / 3 / -1;
  }
  #send {
    grid-area: 4 / 1 / 4 / -1;
    justify-self: end;
  }
`

export default () => {
  const { register, handleSubmit, control, setValue } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <Contact>
      <Title>Contact Us</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller id="firstName" as={<Input />} control={control} default="" name="firstName" placeholder="First Name" />
        <Controller id="lastName" as={<Input />} control={control} default="" name="lastName" placeholder="Last Name" />
        <Controller id="email" as={<Input />} control={control} default="" name="email" placeholder="E-mail" />
        <Controller id="interest" as={<Select
            mode="multiple"
            placeholder="Interested In"
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>}
          control={control}
          name="interest"
          register={register}
          setValue={setValue}
        />
        <Controller id="message" as={<Input />} control={control} default="" name="message" placeholder="Message" />

        <Button id="send" shape="round" onClick={handleSubmit(onSubmit)}>Send</Button>

      </Form>
    </Contact>
  )
}