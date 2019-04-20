import React, { useState } from 'react'
import Input from '../Input'
import styled from 'styled-components'
import { func, string } from 'prop-types'
import Button from '../Button'
import { media } from 'ux/media'

const Message = styled.div` 
  padding: 1rem;
  box-shadow: 0 0.1rem 0.2rem 0 #00000080;
  background-color: #f5f5f5;
  margin-top: 1rem;
  
`

const Editor = styled.form` 
  padding: 1rem;
  box-shadow: 0 0.1rem 0.2rem 0 #00000080;
  background-color: #ffffff;
  align-self: stretch;
  min-width: 25rem;

  & > *:not(:last-child){
    margin-bottom: 1rem;
  }

  ${media.tabletUp`
    align-self: flex-start;
    flex-grow: 0;
  `}
`

const Form = ({ heading, saveForm }) => {

  const [messages, setMessages] = useState([])
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const isFormValid = () => {
    if (!!email && !!password) {
      return true
    }

    return false
  }

  const handleSaveForm = () => {
    setMessages([])
    if (isFormValid()) {

      saveForm({ email, password }, setMessages)
    }

    setEmail("")
    setPassword("")
  }

  return (
    <Editor>
      <h2>{heading}</h2>
      {messages.map((message, index) => (
        <Message key={index}>{message}</Message>
      ))}
      <Input
        label='Email'
        type='text'
        id='email'
        value={email}
        onChange={setEmail}
      />
      <Input
        label='Password'
        type='password'
        id='password'
        value={password}
        onChange={setPassword}
      />
      <Button
        data-testid="Save"
        disabled={!isFormValid()}
        onClick={handleSaveForm}
        type="button"
      >
        Save
      </Button>
    </Editor>
  )
}

Form.propTypes = {
  heading: string.isRequired,
  saveForm: func.isRequired
}

export default Form
