import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import UserProfile from "./UserProfile.tsx";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal.tsx";
import { setToken } from "@/api/services/config/Interceptor.ts";
import { LoginRequireModal } from "@/ui/index.ts";
import { motion, useScroll, useTransform } from "framer-motion";

const Wrapper = styled(motion.header)`
  background-color: ${(props) => props.theme.colors.bgc};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${(props) => props.theme.fonts.english}, serif;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  height: 60px;
  width: 1180px;
`;

const NavigationLinkWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 21px;
  background-color: ${(props) => props.theme.colors.bgc};
`;

const MainLogo = styled.div`
  font-family: ${(props) => props.theme.fonts.english}, serif;
  cursor: pointer;
  font-size: 1.4rem;
  white-space: pre-line;
`;

const MainLink = styled.button`
  font-family: ${(props) => props.theme.fonts.english}, serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 30px;
  background-color: ${(props) => props.theme.colors.bgc};
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

export const Login = styled(motion.button)`
  transition: transform 0.2s ease;
  font-family: ${(props) => props.theme.fonts.english};
  font-weight: 600;
  line-height: 30px;
  padding: 2px 25px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid black;
`;

const Header = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], [100, 60]);

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
    try {
      await keycloak.logout({ redirectUri: "http://localhost:3000" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setToken(keycloak.idToken!);
    }
  }, [keycloak, initialized]);

  const validateLoginStatus = (uri: string) => {
    if (!keycloak.authenticated) {
      setShowModal(true);
      return;
    } else {
      navigate(uri);
    }
  };

  return (
    <Wrapper id="navigation" style={{ height }}>
      {showModal && <LoginRequireModal close={() => setShowModal(false)} />}
      <MainLogo
        onClick={() => {
          navigate("/");
        }}
      >
        {`gomdol\nbook`}
      </MainLogo>
      <NavigationLinkWrapper>
        <MainLink onClick={() => validateLoginStatus("/library/reading")}>
          Library
        </MainLink>
        <MainLink onClick={() => validateLoginStatus("/collections")}>
          Collections
        </MainLink>
      </NavigationLinkWrapper>

      <UserMenuWrapper>
        {keycloak.authenticated ? (
          <UserProfile onLoggedOut={() => void logout()} />
        ) : (
          <Login whileTap={{ scale: 0.75 }} onClick={() => setIsModalOpened(true)}>
            Log in
          </Login>
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
