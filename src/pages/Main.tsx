import React from 'react'
import styled from 'styled-components'
import '../styles/variables.css'
import MainContent from '../components/mainContent/MainContent'

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`

type Props = {}

const Main = (props: Props) => {
  return (
    <Wrapper>
      <MainContent />
    </Wrapper>
  )
}

export default Main
