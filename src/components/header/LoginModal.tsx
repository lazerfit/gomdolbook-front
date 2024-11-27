import React from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1000;
`

type Props = {
  isOpened: boolean
  onClose: () => void
}

function LoginModal(props: Props) {
  if (!props.isOpened) return null
  return (
    <Overlay onClick={props.onClose}>
      <Wrapper>
        <div>LoginModal</div>
        <button onClick={props.onClose}>Close</button>
      </Wrapper>
    </Overlay>
  )
}

export default LoginModal
