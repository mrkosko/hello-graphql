import React from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & input{
    height: 3.6rem;
    border: solid 0.1rem #a6a6a6;
    font-size: 0.5rem;
  }
`

const Input = ({ onChange, label, type, id, value }) => (
  <InputWrapper>
    <label htmlFor={id}>{label}</label>
    <input
      aria-label="form-input"
      data-testid={label}
      type={type}
      id={id}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  </InputWrapper>
)

Input.propTypes = {
  label: string.isRequired,
  onChange: func.isRequired,
  type: string.isRequired,
  id: string.isRequired,
  value: string.isRequired,
}

export default Input