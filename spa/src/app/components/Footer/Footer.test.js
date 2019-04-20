import React from 'react'
import { render, waitForElement, cleanup } from 'react-testing-library'
import SystemUnderTest from './index'

afterEach(cleanup)

const setup = ({ text }) => {

  const utils = render(<SystemUnderTest text={text} />)

  return {
    ...utils,
  }
}

it('will correctly render', async () => {
  const { getByText } = setup({ text: "Test App" })

  await waitForElement(() => getByText(/Test App/i))
})