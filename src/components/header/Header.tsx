import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import styled from 'styled-components'
import '../../styles/variables.css'
import LoginModal from './LoginModal'
import UserProfile from './UserProfile'

const Wrapper = styled.header`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Eczar', serif;
`

const NavigationLinkWrapper = styled.div`
  display: flex;
`

const MainLogo = styled.div`
  font-family: 'Jim Nightshade', cursive;
  cursor: pointer;
`

const MainLink = styled.button`
  font-family: 'Eczar', serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  padding: 0 21px 0 0;
  background-color: transparent;
  cursor: pointer;
`

const UserMenuWrapper = styled.div`
  padding: 22px 0;
  width: 85px;
  display: flex;
  justify-content: flex-end;
`

const Login = styled.button`
  font-family: 'Eczar', serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  padding: 7px 20px;
  background-color: var(--highlight-color);
  border-radius: 20px;
  cursor: pointer;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-1px, -1px);
  }
`

type Props = {}

function Header({}: Props) {
  const navigate = useNavigate()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
        {isLoggedIn ? (
          <UserProfile />
        ) : (
          <>
            <LoginModal
              isModalOpened={isModalOpened}
              onClose={() => setIsModalOpened(false)}
              onLoggedIn={() => {
                setIsLoggedIn(true)
                setIsModalOpened(false)
              }}
            />
            <Login
              onClick={() => {
                setIsModalOpened(true)
              }}>
              Log in
            </Login>
          </>
        )}
      </UserMenuWrapper>
    </Wrapper>
  )
}

export default Header
