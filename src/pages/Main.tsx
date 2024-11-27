import React from 'react'
import styled from 'styled-components'
import '../styles/variables.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import MainContent from '../components/mainContent/MainContent'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`

type Props = {}

function Main({}: Props) {
  return (
    <Wrapper>
      <Header />
      <MainContent />
      <Footer />
    </Wrapper>
  )
}

export default Main
