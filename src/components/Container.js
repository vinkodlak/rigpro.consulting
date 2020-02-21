import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  grid-column: container;
  margin-top: ${props => props.mt ? `${parseInt(props.mt)}px` : 'initial'};
  margin-bottom: ${props => props.mb ? `${parseInt(props.mb)}px` : 'initial'};
`

export default (props) => (
  <Container mt={props.mt} mb={props.mb} className={props.className}>
    { props.children }
  </Container>
)