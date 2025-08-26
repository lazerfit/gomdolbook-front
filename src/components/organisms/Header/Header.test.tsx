import { beforeEach, describe, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import Header from '@/components/organisms/Header';
import { mockNavigate, mockUseKeycloak } from '@/setupTests';

describe('Header', () => {
  describe('login', () => {
    beforeEach(() => {
      mockUseKeycloak.mockReturnValue({
        keycloak: {
          authenticated: true,
        },
        initialized: true,
      } as never);
      render(<Header />);
    });

    it('site-logo를 클릭하면 index페이지로 이동해야한다.', async () => {
      const logo = screen.getByTestId('site-logo');
      await userEvent.click(logo);

      expect(mockNavigate).toBeCalledWith('/');
    });

    it('Library를 클릭하면 library/READING 페이지로 이동해야한다.', async () => {
      const library = screen.getByTestId('header-nav-library');
      await userEvent.click(library);

      expect(mockNavigate).toBeCalledWith('/library/READING');
    });

    it('Collections를 클릭하면 collections 페이지로 이동해야한다.', async () => {
      const collection = screen.getByTestId('header-nav-collection');
      await userEvent.click(collection);

      expect(mockNavigate).toBeCalledWith('/collections');
    });

    it('menu버튼을 클릭하면 dropdown 메뉴가 렌더링되어야 한다.', async () => {
      const menu = screen.getByText('menu');
      expect(menu).toBeInTheDocument();
      await userEvent.click(menu);
      expect(screen.getByText('Collection')).toBeInTheDocument();
    });

    it('dropdown 메뉴 내 collection 클릭하면 collections 페이지로 이동해야한다.', async () => {
      const menu = screen.getByText('menu');
      await userEvent.click(menu);
      const collection = screen.getByText('Collection');

      await userEvent.click(collection);

      expect(mockNavigate).toBeCalledWith('/collections');
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      mockUseKeycloak.mockReturnValue({
        keycloak: {
          authenticated: false,
        },
        initialized: true,
      } as never);
      render(<Header />);
    });

    it('로그인 버튼이 렌더링되어야 한다.', () => {
      const loginBtn = screen.getByText('로그인');
      expect(loginBtn).toBeInTheDocument();
    });

    it('로그인 버튼을 클릭하면 로그인 모달이 렌더링되어야 한다.', async () => {
      const loginBtn = screen.getByText('로그인');
      await userEvent.click(loginBtn);

      const kakao = screen.getByAltText('카카오 로그인');
      const github = screen.getByAltText('깃헙 로그인');
      const google = screen.getByAltText('구글 로그인');
      expect(kakao).toBeInTheDocument();
      expect(github).toBeInTheDocument();
      expect(google).toBeInTheDocument();
    });
  });
});
