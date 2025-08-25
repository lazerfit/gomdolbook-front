import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import LandingPage from '@/components/pages/LandingPage';
import { mockNavigate } from '@/setupTests';

vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    keycloak: {
      authenticated: true,
    },
    initialized: true,
  }),
}));

describe('LandingPage', () => {
  beforeEach(() => {
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
