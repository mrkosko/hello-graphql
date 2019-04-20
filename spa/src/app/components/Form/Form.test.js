import React from 'react'
import { render, waitForElement, cleanup, fireEvent } from 'react-testing-library'
import SystemUnderTest from './index'

afterEach(cleanup)

const setup = ({ heading, saveForm }) => {

  const utils = render(
    <SystemUnderTest
      heading={heading || "heading"}
      saveForm={saveForm || (() => { })}
    />
  )

  const emailInput = utils.getByTestId(/Email/i)
  const passwordInput = utils.getByTestId(/Password/i)
  const saveButton = utils.getByText(/Save/i)

  return {
    emailInput,
    passwordInput,
    saveButton,
    ...utils,
  }
}

it('will correctly render', async () => {
  const { getByText } = setup({ heading: "Test heading" })

  await waitForElement(() => getByText(/Test heading/i))
})

it('will allow email input', async () => {

  const { emailInput } = setup({})

  fireEvent.change(emailInput, { target: { value: 'Abc' } })

  expect(emailInput.value).toBe('Abc')
})

it('will allow password input', async () => {

  const { passwordInput } = setup({})

  fireEvent.change(passwordInput, { target: { value: 'Abc' } })

  expect(passwordInput.value).toBe('Abc')
})

it('will not allow saving empty form', async () => {

  const saveForm = jest.fn()
  const { saveButton } = setup({ saveForm })

  fireEvent.click(saveButton)
  expect(saveForm).not.toHaveBeenCalled()
})

it('will not allow saving partial form', async () => {

  const saveForm = jest.fn()
  const { saveButton, emailInput } = setup({ saveForm })

  fireEvent.change(emailInput, { target: { value: 'Abc' } })

  fireEvent.click(saveButton)
  expect(saveForm).not.toHaveBeenCalled()
})

it('will allow saving complete form', async () => {

  const saveForm = jest.fn()
  const { saveButton, emailInput, passwordInput } = setup({ saveForm })

  fireEvent.change(emailInput, { target: { value: 'Abc' } })
  fireEvent.change(passwordInput, { target: { value: 'Abc' } })

  fireEvent.click(saveButton)
  expect(saveForm).toHaveBeenCalled()
})

it('will render validation errors', async () => {

  const saveForm = (data, onError) => onError(['error123'])

  const { saveButton, emailInput, passwordInput, getByText } = setup({ saveForm })

  fireEvent.change(emailInput, { target: { value: 'Abc' } })
  fireEvent.change(passwordInput, { target: { value: 'Abc' } })

  fireEvent.click(saveButton)
  await waitForElement(() => getByText(/error123/i))
})