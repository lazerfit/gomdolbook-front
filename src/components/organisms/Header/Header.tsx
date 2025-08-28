import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import UserMenu from './UserMenu';
import { useKeycloak } from '@react-keycloak/web';
import { lazy, useEffect, useState, Suspense } from 'react';
import { setToken } from '@/api/services/config/Interceptor';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as mixins from '@/styles/mixins';
import { mediaMax, media } from '@/utils';
import * as fonts from '@/styles/fonts';

const LoginModal = lazy(() => import('../LoginModal'));

const Wrapper = styled(motion.header)`
    background-color: var(--background-light);
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${fonts.fontFamilyEnglish};
    ${fonts.demi};
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    height: 3.75rem;
    width: 100%;
    max-width: 73.75rem;

    ${mediaMax.mobile} {
        width: 100%;
        padding: 0 var(--space-2-5);
    }

    ${media.tablet} and ${mediaMax.tablet} {
        width: 100%;
        padding: 0 var(--space-2-5);
    }
}
`;

const NavMenu = styled.nav`
  ${mixins.flexCenter}
  gap: var(--space-half);
  background-color: var(--background-light);
`;

const HeaderLogo = styled.div`
  ${fonts.fontFamilyEnglish};
  cursor: pointer;
  font-size: 1.4rem;
  white-space: pre-line;
`;

const NavLink = styled(motion.button)`
  ${fonts.fontFamilyEnglish};
  font-size: var(--font-size-xl);
  line-height: 1.4;
  background-color: var(--background-light);
  cursor: pointer;
  padding: var(--space-1-5) var(--space-2);
  transition: 0.2s ease;
  border-radius: var(--radius-md);
  color: var(--primary-text);

  &:hover {
    background-color: var(--background-grey);
  }

  ${mediaMax.mobile} {
    display: none;
  }
`;

const UserDropdown = styled.div`
  padding: var(--space-3);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const LoginButton = styled(motion.button)`
  transition: transform 0.2s ease;
  ${fonts.fontFamilyEnglish};
  font-weight: 600;
  line-height: 1.875rem;
  padding: var(--space-half) var(--space-2-5);
  background-color: var(--accent-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--background-light);

  &:hover {
    background-color: var(--accent-color-hover);
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], [100, 60]);

  const login = async (idp: string) => {
    try {
      await keycloak.login({
        redirectUri: 'http://localhost:3000/',
        idpHint: idp,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await keycloak.logout({ redirectUri: 'http://localhost:3000' });
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
      return;
    } else {
      navigate(uri);
    }
  };

  return (
    <Wrapper role="banner" style={{ height }}>
      <HeaderLogo
        data-testid="site-logo"
        onClick={() => {
          navigate('/');
        }}>
        {`gomdol\nbook`}
      </HeaderLogo>
      <NavMenu>
        <NavLink
          onClick={() => validateLoginStatus('/library/READING')}
          whileTap={{ scale: 0.8 }}
          data-testid="header-nav-library">
          Library
        </NavLink>
        <NavLink
          onClick={() => validateLoginStatus('/collections')}
          whileTap={{ scale: 0.8 }}
          data-testid="header-nav-collection">
          Collections
        </NavLink>
      </NavMenu>
      <UserDropdown>
        {keycloak.authenticated ? (
          <UserMenu onLoggedOut={() => void logout()} />
        ) : (
          <LoginButton whileTap={{ scale: 0.75 }} onClick={() => setIsModalOpened(true)}>
            로그인
          </LoginButton>
        )}
      </UserDropdown>
      <Suspense fallback={null}>
        <LoginModal
          isOpen={isModalOpened}
          close={() => setIsModalOpened(false)}
          github={() => void login('github')}
          kakao={() => void login('kakao')}
          google={() => void login('google')}
        />
      </Suspense>
    </Wrapper>
  );
};

export default Header;
