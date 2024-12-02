import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
`

const ContentWrapper = styled.div`
  width: 280px;
  display: flex;
  border: 1px solid black;
`

type Props = {}

function Books({}: Props) {
  return (
    <Wrapper>
      <ContentWrapper>
        <div>Books</div>
      </ContentWrapper>
      <ContentWrapper>
        <div>Books</div>
      </ContentWrapper>
      <ContentWrapper>
        <div>Books</div>
      </ContentWrapper>
      <ContentWrapper>
        <div>Books</div>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Books
