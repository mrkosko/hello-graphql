import React from 'react'
import ApolloClient from "apollo-boost"
import { host } from 'config/apiConfig'
import gql from "graphql-tag"



const client = new ApolloClient({
  uri: host + '/graphql'
});

client
  .query({
    query: gql`
      {
        hello
      }
    `
  })
  .then(result => console.log(result));

export default () => (
  <div>
    Hello
    </div>
)