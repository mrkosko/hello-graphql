import React from 'react'
import { render, waitForElement, cleanup } from 'react-testing-library'
import SystemUnderTest from './index'

afterEach(cleanup)

const setup = ({ users }) => {

  const utils = render(<SystemUnderTest users={users} />)

  return {
    ...utils,
  }
}

const aUser = { email: 'm@a.com', password: 'pass@t' };

it('will correctly render user item', async () => {
  const { getByText } = setup({ users: [aUser] })

  await waitForElement(() => getByText(/m@a.com/i))
  await waitForElement(() => getByText(/pass@t/i))
})

it('will correctly render multiple items', () => {
  const { getAllByTestId } = setup({ users: [aUser, aUser] })

  expect(getAllByTestId('user-item').length).toBe(2)
})