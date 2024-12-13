import React from 'react'
import styled from 'styled-components'
import '../styles/variables.css'
import MainPageContent from '../components/mainPageContent/MainPageContent'

const Wrapper = styled.section`
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
      <MainPageContent />
    </Wrapper>
  )
}

export default Main
