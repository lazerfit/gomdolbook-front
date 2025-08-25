import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import { BookSearchResultItem } from '@/components/molecules/BookSearchResultItem/index';
import userEvent from '@testing-library/user-event';

const mockBookResponse = {
  title: 'testTitle',
  author: 'testAuthor',
  pubDate: '2025-08-15',
  description: 'testDescription',
  cover: 'testCover',
  categoryName: 'testCategoryName',
  publisher: 'testPublisher',
  isbn13: 'testIsbn',
};

const mockOnClick = vi.fn();

describe('BookSearchResultItem', () => {
  beforeEach(() => {
    render(<BookSearchResultItem book={mockBookResponse} onClick={mockOnClick} />);
  });

  it('제목, 저자, 설명, 커버가 렌더링되어야 한다.', () => {
    const cover = screen.getByAltText('cover');
    const title = screen.getByText(mockBookResponse.title);
    const author = screen.getByText(mockBookResponse.author);
    const pub = screen.getByText(mockBookResponse.publisher);
    const pubDate = screen.getByText('2025년 08월');
    const desc = screen.getByText(mockBookResponse.description);

    expect(cover).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(pub).toBeInTheDocument();
    expect(pubDate).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  it('아이템 영역을 클릭하면 onClick 함수가 실행되어야 한다.', async () => {
    const cover = screen.getByAltText('cover');
    await userEvent.click(cover);

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
