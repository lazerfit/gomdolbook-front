import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'
import Banner from './Banner'

type Props = {}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 55px auto 0 auto;
  // border: 1px solid black;
  align-items: center;
  height: 1000px;
`

function MainContent({}: Props) {
  return (
    <Wrapper>
      <Banner />
      <div>MainContent</div>
    </Wrapper>
  )
}

export default MainContent
