import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'
import MockupImg from '../../assets/img/avatar-02.jpg'

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`

type Props = {}

function UserProfile({}: Props) {
  return (
    <Wrapper>
      <Image src={MockupImg} />
    </Wrapper>
  )
}

export default UserProfile
