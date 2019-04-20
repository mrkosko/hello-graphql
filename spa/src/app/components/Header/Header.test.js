import React from 'react'
import { render, waitForElement, cleanup } from 'react-testing-library'
import SystemUnderTest from './index'

afterEach(cleanup)

const setup = ({ heading }) => {

  const utils = render(<SystemUnderTest heading={heading} />)

  return {
    ...utils,
  }
}

it('will correctly render', async () => {
  const { getByText } = setup({ heading: "Test heading" })

  await waitForElement(() => getByText(/Test heading/i))
})