import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'

const Wrapper = styled.div`
  width: 100%;
  margin: 15px auto 10px auto;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'SUITE Variable', sans-serif;
  background-color: var(--secondary-background-color);
`

type Props = {}

function Footer({}: Props) {
  return (
    <Wrapper>
      <div>Footer</div>
    </Wrapper>
  )
}

export default Footer
