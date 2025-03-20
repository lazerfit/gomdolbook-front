import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import UserProfile from "./UserProfile.tsx";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal.tsx";
import { setToken } from "@/api/services/config/Interceptor.ts";
import { LoginRequireModal } from "@/ui/index.ts";
import { motion, useScroll, useTransform } from "framer-motion";

const NavigationLinkWrapper = styled.nav`
  display: flex;
`;

const MainLogo = styled.div`
  font-family: ${(props) => props.theme.fonts.english}, serif;
  cursor: pointer;
  margin-right: 90px;
  font-size: 1.4rem;
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

const Login = styled(motion.button)`
  transition: transform 0.2s ease;
  font-family: ${(props) => props.theme.fonts.english};
  font-weight: 500;
  line-height: 30px;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
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
    <motion.header id="navigation" style={{ height }}>
      {showModal && <LoginRequireModal close={() => setShowModal(false)} />}
      <NavigationLinkWrapper>
        <MainLink onClick={() => validateLoginStatus("/library/reading")}>
          Library
        </MainLink>
        <MainLink onClick={() => validateLoginStatus("/collections")}>
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
    </motion.header>
  );
};

export default Header;
