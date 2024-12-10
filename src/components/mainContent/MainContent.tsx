import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'
import Banner from './Banner'
import SearchBar from './SearchBar'
import Books from './Books'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 55px auto 0 auto;
  align-items: center;
  height: 100%;
`

type Props = {}

function MainContent({}: Props) {
  return (
    <Wrapper>
      {/* <Banner /> */}
      {/* <SearchBar /> */}
      <Books />
    </Wrapper>
  )
}

export default MainContent
