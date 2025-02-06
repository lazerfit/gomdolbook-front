import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import UserProfile from "./UserProfile.tsx";
import { ButtonMd } from "@/styles/common.styled.ts";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal.tsx";
import { setToken } from "@/api/services/config/RequestInterceptor.ts";

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

const Header = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const login = async (idp: string) => {
    try {
      await keycloak.login({
        redirectUri: "http://localhost:3000/",
        idpHint: idp,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await keycloak.logout();
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setToken(keycloak.idToken!);
    }

    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed) {
            setToken(keycloak.idToken!);
          }
        })
        .catch((e) => console.log(e));
    };
  }, [keycloak, initialized]);

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
            navigate("/collections");
          }}
        >
          Collections
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
        {keycloak.authenticated ? (
          <UserProfile onLoggedOut={() => void logout()} />
        ) : (
          <Login onClick={() => setIsModalOpened(true)}>Log in</Login>
        )}
      </UserMenuWrapper>
      <LoginModal
        isModalOpened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        github={() => void login("github")}
        kakao={() => void login("kakao")}
        google={() => void login("google")}
      />
    </Wrapper>
  );
};

export default Header;
