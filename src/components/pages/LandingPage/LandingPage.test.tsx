import { beforeEach, describe, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import LandingPage from '@/components/pages/LandingPage';
import { mockNavigate, mockUseKeycloak } from '@/setupTests';

describe('LandingPage', () => {
  describe('authenticated', () => {
    beforeEach(() => {
      mockUseKeycloak.mockReturnValue({
        keycloak: {
          authenticated: true,
        },
        initialized: true,
      } as never);
      render(<LandingPage />);
    });

    it('bookCover와 input이 렌더링되어야 한다.', async () => {
      const cover = await screen.findByTestId('bookCover-isbn');
      const input = await screen.findByPlaceholderText('ISBN, NAME, AUTHOR ...');
      expect(cover).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it('bookCover를 클릭하면 readingLog 페이지로 이동해야 한다.', async () => {
      const cover = await screen.findByTestId('bookCover-isbn');
      await userEvent.click(cover);

      expect(mockNavigate).toBeCalledWith('/readingLog/isbn/1');
    });
  });

  describe('unauthenticated', () => {
    beforeEach(() => {
      mockUseKeycloak.mockReturnValue({
        keycloak: {
          authenticated: false,
        },
        initialized: true,
      } as never);
      render(<LandingPage />);
    });

    it('배너가 렌더링되어야 한다.', () => {
      expect(screen.getByText('책을 넘어, 당신의 생각을 기록하세요')).toBeInTheDocument();
    });

    it('이미지가 렌더링되어야 한다.', () => {
      expect(screen.getByTestId('feature-reading-log')).toBeInTheDocument();
    });

    it('이미지를 클릭하면 모달창이 렌더링되어야 한다.', async () => {
      const img = screen.getByTestId('feature-reading-log');
      await userEvent.click(img);

      expect(await screen.findByText('독서 기록')).toBeInTheDocument();
    });
  });
});
