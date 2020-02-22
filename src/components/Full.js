import React from 'react'
import styled from 'styled-components'

const Full = styled.div`
  grid-column: full;
  margin-top: ${props => props.mt ? `${parseInt(props.mt)}px` : 'initial'};
  margin-bottom: ${props => props.mb ? `${parseInt(props.mb)}px` : 'initial'};
  display: grid;
  grid-template-columns: var(--mainGrid);
`

export default (props) => (
  <Full mt={props.mt} mb={props.mb} className={props.className}>
    { props.children }
  </Full>
)