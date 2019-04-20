import styled from 'styled-components'

const Button = styled.button`
  background-color: #1e808f;
  border-radius: 0.3rem;
  color: #ffffff;
  padding: 1em;
  min-width: 10em;

  &:disabled{
    background-color: #b2b2b2;
  }
`


export default Button