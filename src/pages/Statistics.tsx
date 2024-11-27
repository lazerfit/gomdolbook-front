import React from 'react'
import styled from 'styled-components'
import '../styles/variables.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const Wrapper = styled.div`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`

type Props = {}

function Statistics({}: Props) {
  return (
    <>
      <Header />
      <Wrapper>
        <div>Statistics</div>
      </Wrapper>
      <Footer />
    </>
  )
}

export default Statistics
