import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ heading }) => (
  <header>
    <h1>{heading}</h1>
  </header>
)

Header.propTypes = {
  heading: PropTypes.string.isRequired
}

export default Header