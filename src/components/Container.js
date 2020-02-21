import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  grid-column: 2 / span 12;
`

export default ({ children }) => (
  <Container>
    { children }
  </Container>
)