import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import LibraryPage from 'src/components/pages/LibraryPage';
import { mockNavigate } from 'src/setupTests';

vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    keycloak: {
      authenticated: true,
    },
    initialized: true,
  }),
}));

describe('LibraryPage', () => {
  beforeEach(() => {
    render(<LibraryPage />);
  });

  it('status Nav가 렌더링되어야 한다.', async () => {
    const readingBtn = await screen.findByText('읽는 중');
    const toReadBtn = await screen.findByText('읽을 예정');
    const finishedBtn = await screen.findByText('읽기 완료');
    expect(readingBtn).toBeInTheDocument();
    expect(toReadBtn).toBeInTheDocument();
    expect(finishedBtn).toBeInTheDocument();
  });

  it('bookCover가 렌더링되어야 한다.', async () => {
    const cover = await screen.findByTestId('bookCover-isbn');
    expect(cover).toBeInTheDocument();
  });

  it('bookCover를 클릭하면 readingLog 페이지로 이동해야 한다.', async () => {
    const cover = await screen.findByTestId('bookCover-isbn');
    await userEvent.click(cover);

    expect(mockNavigate).toBeCalledWith('/readingLog/isbn/1');
  });
});
