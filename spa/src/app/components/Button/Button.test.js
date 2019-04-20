import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import SystemUnderTest from './index'

afterEach(cleanup)

const setup = ({ onClick, children }) => {

  const utils = render(
    <SystemUnderTest onClick={onClick}>
      {children}
    </SystemUnderTest>
  )

  return {
    ...utils,
  }
}

it('will call "onClick" prop when button clicked', () => {
  const onClick = jest.fn()
  const { getByText } = setup({ onClick, children: "Go" })

  fireEvent.click(getByText(/Go/i))
  expect(onClick).toHaveBeenCalled()
})