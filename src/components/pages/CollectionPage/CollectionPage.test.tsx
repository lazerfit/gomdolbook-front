import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import CollectionPage from '@/components/pages/CollectionPage';
import { mockNavigate } from '@/setupTests';

vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    keycloak: {
      authenticated: true,
    },
    initialized: true,
  }),
}));

describe('CollectionPage', () => {
  beforeEach(() => {
    render(<CollectionPage />);
  });

  it('collection 기본정보가 렌더링되어야 한다.', async () => {
    const collectionTitle = await screen.findByText('Collection');
    const cover = await screen.findByAltText('책표지-0');
    expect(collectionTitle).toBeInTheDocument();
    expect(cover).toBeInTheDocument();
  });

  it('cover를 클릭하면 collections detail 페이지로 이동해야한다.', async () => {
    const collectionTitle = await screen.findByText('Collection');
    const cover = await screen.findByAltText('책표지-0');
    expect(collectionTitle).toBeInTheDocument();
    expect(cover).toBeInTheDocument();

    await userEvent.click(cover);

    expect(mockNavigate).toBeCalledWith('/collections/5');
  });

  it('collection create button이 렌더링되어야 한다.', async () => {
    const addButton = await screen.findByTestId('create-collection-button');
    expect(addButton).toBeInTheDocument();
  });

  it('collection create button을 클릭하면 input 창이 렌더링되어야 한다.', async () => {
    const user = userEvent.setup();
    const addButton = await screen.findByTestId('create-collection-button');

    await user.click(addButton);

    expect(await screen.findByPlaceholderText('컬렉션 이름을 입력해주세요...')).toBeInTheDocument();
  });
});
