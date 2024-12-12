import React from 'react'
import styled, {keyframes} from 'styled-components'
import '../../../styles/variables.css'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const BounceIn = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.3);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  z-index: 1000;
  padding: 30px;
  font-family: 'Gothic A1', sans-serif;
  animation: ${BounceIn} 0.5s ease;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CloseButton = styled.button`
  width: 20px;
  position: absolute;
  right: 20px;
  top: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.4em;
`

const Banner = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 34px;
`

const EasyLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const EasyLoginButton = styled.button`
  border-radius: 5px;
  padding: 15px;
  margin: 8px 0;
  font-family: 'Gothic A1', sans-serif;
  cursor: pointer;
  color: white;
`

type Props = {
  isModalOpened: boolean
  onClose: () => void
  onLoggedIn: () => void
}

const LoginModal = (props: Props) => {
  if (!props.isModalOpened) return null
  return (
    <>
      <Overlay onClick={props.onClose} />
      <Wrapper>
        <ContentWrapper>
          <CloseButton onClick={props.onClose}>&times;</CloseButton>
          <Banner>로그인/회원가입</Banner>
          <EasyLoginWrapper>
            <EasyLoginButton
              style={{backgroundColor: '#FEE500', color: 'black'}}
              onClick={props.onLoggedIn}>
              카카오로 시작하기
            </EasyLoginButton>
            <EasyLoginButton
              style={{backgroundColor: '#00DE5A'}}
              onClick={props.onLoggedIn}>
              네이버로 시작하기
            </EasyLoginButton>
          </EasyLoginWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}

export default LoginModal
