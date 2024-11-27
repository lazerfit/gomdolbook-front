import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import '../../styles/variables.css'
import LoginModal from './LoginModal'
import {useState} from 'react'

const Wrapper = styled.header`
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`

const NavigationLinkWrapper = styled.div`
  margin-right: auto;
  display: flex;
`

const MainLogo = styled.div`
  font-family: 'Jim Nightshade', cursive;
  cursor: pointer;
`

const MainLink = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  padding: 0 16px;
  background-color: transparent;
  cursor: pointer;
`

const UserMenuWrapper = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px 0;
`

const Signup = styled.div`
  cursor: pointer;
  font-weight: 400;
`

const Login = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  padding: 7px 20px;
  background-color: var(--highlight-color);
  border-radius: 20px;
  cursor: pointer;
  color: white;
  margin-left: 16px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-1px, -1px);
  }
`

type Props = {}

function Header({}: Props) {
  const navigate = useNavigate()
  const [isOpened, setIsOpened] = useState(false)

  return (
    <Wrapper>
      <NavigationLinkWrapper>
        <MainLink
          onClick={() => {
            navigate('/library')
          }}>
          Library
        </MainLink>
        <MainLink
          onClick={() => {
            navigate('/statistics')
          }}>
          Statistics
        </MainLink>
      </NavigationLinkWrapper>
      <MainLogo
        className="title-sm"
        onClick={() => {
          navigate('/')
        }}>
        gomdolbook
      </MainLogo>
      <UserMenuWrapper>
        <LoginModal isOpened={isOpened} onClose={() => setIsOpened(false)} />
        <Signup>Sign up</Signup>
        <Login
          onClick={() => {
            setIsOpened(true)
          }}>
          Log in
        </Login>
      </UserMenuWrapper>
    </Wrapper>
  )
}

export default Header
