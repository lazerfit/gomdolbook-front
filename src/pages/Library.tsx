import React from 'react'
import styled from 'styled-components'
import '../styles/variables.css'

type Props = {}

const Wrapper = styled.div`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`

function Library({}: Props) {
  return (
    <>
      <Wrapper>
        <div>Library</div>
      </Wrapper>
    </>
  )
}

export default Library
