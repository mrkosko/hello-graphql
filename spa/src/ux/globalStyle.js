import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 0.625em;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  body {
    background-color: #f5f5f5;
  }
  #root {
    max-width: 76rem;
    margin: auto;
  }
`

export default GlobalStyle; 