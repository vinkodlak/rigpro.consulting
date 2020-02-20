import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  grid-column: 2;
`

export default ({ children }) => (
  <Container>
    { children }
  </Container>
)