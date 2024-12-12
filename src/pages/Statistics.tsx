import React from 'react'
import styled from 'styled-components'
import '../styles/variables.css'

const Wrapper = styled.div`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`

type Props = {}

const Statistics = (props: Props) => {
  return (
    <>
      <Wrapper>
        <div>Statistics</div>
      </Wrapper>
    </>
  )
}

export default Statistics
