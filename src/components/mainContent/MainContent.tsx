import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'

type Props = {}

const Wrapper = styled.div`
  width: 1180px;
  display: flex;
  margin: 50px auto 0 auto;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  height: 1000px;
`

function MainContent({}: Props) {
  return (
    <Wrapper>
      <div>MainContent</div>
    </Wrapper>
  )
}

export default MainContent
