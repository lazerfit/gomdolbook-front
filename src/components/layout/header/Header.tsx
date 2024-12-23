import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";
import LoginModal from "./LoginModal";
import UserProfile from "./UserProfile";
import { ButtonMd } from "@/styles/common.styled";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${(props) => props.theme.fonts.english}, serif;
`;

const NavigationLinkWrapper = styled.div`
  display: flex;
`;

const MainLogo = styled.h3`
  font-family: "Jim Nightshade", cursive;
  cursor: pointer;
  margin-right: 60px;
`;

const MainLink = styled.button`
  font-family: ${(props) => props.theme.fonts.english}, serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 30px;
  padding: 0 21px 0 0;
  background-color: transparent;
  cursor: pointer;
`;

const UserMenuWrapper = styled.div`
  padding: 22px 0;
  width: 85px;
  height: 90px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Login = styled(ButtonMd)`
  transition: transform 0.2s ease;
  font-family: ${(props) => props.theme.fonts.english};

  &:hover {
    transform: translate(-1px, -1px);
  }
`;

interface Props {
  isLoggedIn: boolean;
  onLoggedIn: () => void;
  onLoggedOut: () => void;
}

const Header = (props: Props) => {
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleLogin = () => {
    props.onLoggedIn();
    setIsModalOpened(false);
  };
  return (
    <Wrapper>
      <NavigationLinkWrapper>
        <MainLink
          onClick={() => {
            navigate("/library");
          }}
        >
          Library
        </MainLink>
        <MainLink
          onClick={() => {
            navigate("/statistics");
          }}
        >
          Statistics
        </MainLink>
      </NavigationLinkWrapper>
      <MainLogo
        onClick={() => {
          navigate("/");
        }}
      >
        gomdolbook
      </MainLogo>
      <UserMenuWrapper>
        {props.isLoggedIn ? (
          <UserProfile onLoggedOut={props.onLoggedOut} />
        ) : (
          <>
            <LoginModal
              isModalOpened={isModalOpened}
              onClose={() => {
                setIsModalOpened(false);
              }}
              onLoggedIn={handleLogin}
            />
            <Login onClick={() => setIsModalOpened(true)}>Log in</Login>
          </>
        )}
      </UserMenuWrapper>
    </Wrapper>
  );
};

export default Header;
