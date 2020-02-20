import React from 'react'
import styled from 'styled-components'
import WorkflowItem from "./WorkflowItem"

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  grid-template-rows: repeat(20, auto);
  grid-gap: 12px 0;

  @media (max-width: 767px) {
    grid-template-columns: 80px 1fr;
  }
`
const Timeline = styled.footer`
  grid-column: 2;
  grid-row: 1 / -1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='5' viewBox='0 0 2 5'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%238990aa;%7D%3C/style%3E%3C/defs%3E%3Ccircle class='a' cx='1' cy='1' r='1'/%3E%3C/svg%3E");
  background-position-x: center;
  background-repeat-x: no-repeat;

  @media (max-width: 767px) {
    grid-column: 1;
  }
`

const Workflows = ({ workflows }) => {
  return (
    <Grid>
      {workflows.map((workflow, index) => (
        <WorkflowItem key={index} row={index+1}
          image={workflow.image}
          title={workflow.title}
          description={workflow.description}
          body={workflow.body}
        />
      ))}
      <Timeline></Timeline>
    </Grid>
  )
}

export default Workflows