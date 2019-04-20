import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledParagraph = styled.p`
    text-align: center;
`

const Footer = ({ text }) => (
  <footer>
    <StyledParagraph>{text}</StyledParagraph>
  </footer>
)

Footer.propTypes = {
  text: PropTypes.string.isRequired
}

export default Footer