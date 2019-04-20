import React, { useState } from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import SystemUnderTest from './index'

afterEach(cleanup)

const SutWrapper = () => {
  const [value, setValue] = useState("" )
  return (
    <SystemUnderTest value={value} onChange={setValue} label="test" type="text" id="123" saveForm={() => { }} />
   )
}

const setup = () => {
  const { getByLabelText, ...utils } = render(
    <SutWrapper />
  )
  const input = getByLabelText('form-input')
  return {
    input,
    getByLabelText,
    ...utils,
  }
}

it('will correctly capture entry', () => {
  const { input } = setup()

  fireEvent.change(input, { target: { value: 'Abc' } })

  expect(input.value).toBe('Abc')
})