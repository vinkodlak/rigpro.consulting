import React from 'react'
import styled from 'styled-components'

const Full = styled.div`
  grid-column: full;
  margin-top: ${props => `${parseInt(props.mt)}px`};
  margin-bottom: ${props => `${parseInt(props.mb)}px`};
`

export default ({ children, mt, mb }) => (
  <Full mt={mt} mb={mb}>
    { children }
  </Full>
)