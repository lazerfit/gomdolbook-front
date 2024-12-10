import React from 'react'
import styled from 'styled-components'
import '../../../styles/variables.css'

const Wrapper = styled.footer`
  width: 100%;
  height: 100px;
  margin: 144px auto 0 auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Eczar', serif;
`

const ContentWrapper = styled.div`
  width: 100%;
  height: 90px;
  padding: 45px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`

const LinkWrapper = styled.div`
  width: 100%;
  height: 10px;
  display: flex;
  justify-content: center;
  padding-top: 13px;
`

const MiddleDot = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin: 0 5px;
`

type Props = {}

function Footer({}: Props) {
  return (
    <Wrapper>
      <ContentWrapper>
        <div>@Designed By gomdolbook</div>
      </ContentWrapper>
      <LinkWrapper>
        <div>github</div>
        <MiddleDot>&#183;</MiddleDot>
        <div>Linkedin</div>
      </LinkWrapper>
    </Wrapper>
  )
}

export default Footer
