import React, { Fragment, useState, useEffect } from 'react'
import gql from "graphql-tag"
import ApolloClient from "apollo-boost"
import styled from 'styled-components'
import { apiEndPoint } from 'config/apiConfig'
import { media } from 'ux/media'
import GlobalStyle from 'ux/globalStyle'
import Header from './components/Header'
import Footer from './components/Footer'
import Form from './components/Form'
import UserList from './components/UserList'

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

const client = new ApolloClient({
  uri: `${apiEndPoint}`
});

const App = () => {

  const [users, setUsers] = useState([])

  const loadUsers = async (pageNumber = 1) => {

    client
      .query({
        query: gql`
        {
          users {
            Id
            email
          }
        }
        `
      })
      .then(({data}) => 
        setUsers(data.users));
  }

  const registerUser = async ({ email }, onResponseMessageReceived = () => { }) => {
    if (!email)
      return

    client
      .mutate({
        mutation: gql`
        mutation CreateUser {
          createUser(userName: "${email}", password: "abc"){
            userName
          }
        }
        `
      })
      .then(d => loadUsers());
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <Fragment>
      <GlobalStyle />
      <Header heading='GraphQL User App' />
      <Grid>
        <Form heading="Enter your details here" saveForm={registerUser} />
        <ListWrapper>
          <UserList users={users} />
        </ListWrapper>
      </Grid>
      <Footer text={`GraphQL User App ${new Date().getFullYear()}`} />
    </Fragment>
  )
}

export default App