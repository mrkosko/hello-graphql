import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import { apiEndPoint } from 'config/apiConfig'
import { placeHttpRequest } from 'util/httpRequest'
import { resolveMessage } from 'util/resolveMessage'
import { media } from 'ux/media'
import GlobalStyle from 'ux/globalStyle'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'
import UserList from './components/UserList'
import Button from './components/Button'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  & > *:not(:last-child){
    margin-bottom: 2rem;
  }

  ${media.tabletUp`
    flex-direction: row;

    & > *:not(:last-child){
      margin-right: 2rem;
    }
  `}
`

const ListWrapper = styled.div`
  flex-grow: 1;

  & > *:not(:first-child){
    margin-top: 1rem;
  }
`

const App = () => {

  const [users, setUsers] = useState([])

  const [currentPageNumber, setPageNumber] = useState(1)
  const [currentHasPreviousPage, setHasPreviousPage] = useState(false)
  const [currentHasNextPage, setHasNextPage] = useState(false)

  const loadUsers = async (pageNumber = 1) => {
    const {
      payload: { users, page, hasPreviousPage, hasNextPage }
    } = await placeHttpRequest(`${apiEndPoint}/users?page=${pageNumber}`, 'get', {}, fetch)

    setUsers(users)
    setPageNumber(page)
    setHasNextPage(hasNextPage)
    setHasPreviousPage(hasPreviousPage)
  }

  const registerUser = async ({ email, password }, onResponseMessageReceived = () => { }) => {
    if (!email || !password)
      return
    try {
      await placeHttpRequest(`${apiEndPoint}/users`, 'post', { email, password }, fetch)

      await loadUsers()
    }
    catch ({ responseMessages }) {
      onResponseMessageReceived(responseMessages.map(resolveMessage))
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])


  return (
    <Fragment>
      <GlobalStyle />
      <Header heading='WorldRemit' />
      <Grid>
        <Form heading="Enter your details here" saveForm={registerUser} />
        <ListWrapper>
          <UserList users={users} />
          <Button
            onClick={() => loadUsers(currentPageNumber - 1)}
            disabled={!currentHasPreviousPage}>
            Previous
          </Button>
          <Button
            onClick={() => loadUsers(currentPageNumber + 1)}
            disabled={!currentHasNextPage}>
            Next
          </Button>
        </ListWrapper>
      </Grid>
      <Footer text={`WorldRemit tech task ${new Date().getFullYear()}`} />
    </Fragment>
  )
}

export default App