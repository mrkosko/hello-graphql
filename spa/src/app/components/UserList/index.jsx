import React from 'react'
import styled from 'styled-components'
import { arrayOf, string, shape } from 'prop-types'


const Heading = styled.h3`
  font-size: 2rem;
  color: #002d64;
`

const Item = styled.li`
  padding: 1rem;
  box-shadow: 0 0.1rem 0.2rem 0 #00000080;
  background-color: #ffffff;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  & > *:not(:last-child){
    margin-bottom: 1rem;
  }
`

const UserList = ({ users }) => (
  <List>
    {users.map(({ email, password }, index) => (
      <Item data-testid="user-item" key={index}>
        <Heading>{email}</Heading>
        <p>{password}</p>
      </Item>
    ))}
  </List>
)

UserList.defaultProps = {
  users: []
}

UserList.propTypes = {
  users: arrayOf(shape({
    email: string.isRequired,
    password: string.isRequired
  }))
}

export default UserList
