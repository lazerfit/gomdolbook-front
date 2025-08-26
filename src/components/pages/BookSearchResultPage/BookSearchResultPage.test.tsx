import { beforeEach, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import BookSearchResultPage from 'src/components/pages/BookSearchResultPage';
import { mockUseKeycloak, mockNavigate } from 'src/setupTests';

describe('BookSearchResultPage', () => {
  beforeEach(() => {
    mockUseKeycloak.mockReturnValue({
      keycloak: {
        authenticated: true,
      },
    } as never);
    render(<BookSearchResultPage />, { initialEntries: ['/search/react'], path: '/search/:title' });
  });

  it('검색결과가 렌더링되어야 한다.', async () => {
    const searchResultText = await screen.findByText('react');
    const title2 = await screen.findByText('title2');
    expect(searchResultText).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });

  it('책을 클릭하면 상세페이지로 이동해야 한다.', async () => {
    const title2 = await screen.findByText('title2');
    await userEvent.click(title2);

    expect(mockNavigate).toBeCalledWith('/detail/isbn2');
  });
});
