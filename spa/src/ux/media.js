import { css } from 'styled-components'

export const breakPoints = {
  largeDesktop: 992,
  desktop: 768,
  tablet: 576,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(breakPoints).reduce((acc, label) => {
  acc[`${label}Up`] = (...args) => css`
    @media (min-width: ${breakPoints[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})