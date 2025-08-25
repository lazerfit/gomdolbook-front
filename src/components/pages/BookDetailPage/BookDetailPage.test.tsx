import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import BookDetailPage from '@/components/pages/BookDetailPage';

vi.mock('react-tooltip');
vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    keycloak: {
      authenticated: true,
    },
    initialized: true,
  }),
}));
vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}));

describe('BookDetailPage', () => {
  beforeEach(() => {
    render(<BookDetailPage />, { initialEntries: ['/detail/1234567890'], path: '/detail/:isbn' });
  });

  it('bookInfo가 렌더링되어야 한다.', async () => {
    const title = await screen.findByText('title');
    const author = await screen.findByText('author');
    const publisher = await screen.findByText('pub');
    const pubDate = await screen.findByText('pubDate년');
    const description = await screen.findByText('desc');
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(pubDate).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(screen.getByTestId('add-to-collection')).toBeInTheDocument();
  });

  it('bookmark 버튼을 클릭하면 modal창이 열려야한다.', async () => {
    const user = userEvent.setup();
    const addToCollectionButton = await screen.findByTestId('add-to-collection');

    await user.click(addToCollectionButton);

    expect(await screen.findByText('컬렉션에 추가하기')).toBeInTheDocument();
  });

  it('hearth 버튼을 클릭하면 modal창이 열려야한다.', async () => {
    const user = userEvent.setup();
    const addToLibraryButton = await screen.findByTestId('add-to-library');

    await user.click(addToLibraryButton);

    expect(await screen.findByText('내 서재 저장')).toBeInTheDocument();
  });
});
