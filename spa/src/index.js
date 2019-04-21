import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"
import { apiEndPoint } from 'config/apiConfig'

import App from './app/apolloApp'

const client = new ApolloClient({
  uri: `${apiEndPoint}`
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Root />,
  document.getElementById("root")
)