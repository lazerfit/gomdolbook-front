import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import BookSearchInput from './BookSearchInput';
import userEvent from '@testing-library/user-event';
import { render } from '@/test-utils';
import { mockNavigate, mockUseKeycloak } from '@/setupTests';

describe('BookSearchInput', () => {
  describe('사용자 로그인 했을 경우', () => {
    beforeEach(() => {
      mockUseKeycloak.mockReturnValue({
        keycloak: {
          authenticated: true,
        },
      } as never);
      render(<BookSearchInput />);
    });

    it('검색어를 입력하고 Enter를 누르면 검색페이지로 이동해야한다.', async () => {
      const input = screen.getByLabelText('Search');
      const searchTerm = 'react';

      await userEvent.type(input, searchTerm);
      await userEvent.keyboard('{Enter}');

      expect(mockNavigate).toBeCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(`/search/${searchTerm}`);
    });
  });

  describe('로그인하지 않았을 경우', () => {
    beforeEach(() => {
      mockUseKeycloak.mockReturnValue({
        keycloak: {
          authenticated: false,
        },
      } as never);
      render(<BookSearchInput />);
    });

    it('검색어를 입력하고 Enter를 누르면 검색페이지로 이동하지 말아야한다.', async () => {
      const input = screen.getByLabelText('Search');
      const searchTerm = 'react';

      await userEvent.type(input, searchTerm);
      await userEvent.keyboard('{Enter}');

      expect(mockNavigate).not.toBeCalled();
    });
  });
});
