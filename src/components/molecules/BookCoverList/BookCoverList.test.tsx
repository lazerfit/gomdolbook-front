import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from 'vitest';
import BookCoverList from './BookCoverList';
import userEvent from '@testing-library/user-event';

const mockBooks = [
  {
    title: 'testTitle',
    cover: 'testCover',
    isbn: 'testIsbn',
    readingLogId: 5,
  },
];

const mockBooksWithoutReadingLogId = [
  {
    title: 'testTitle',
    cover: 'testCover',
    isbn: 'testIsbn',
  },
];

const mockOnCoverClick = vi.fn();

describe('BookCoverList', () => {
  describe('readingLogId가 있는 BookCoverList', () => {
    beforeEach(() => {
      mockOnCoverClick.mockClear();
      render(<BookCoverList books={mockBooks} onCoverClick={mockOnCoverClick} />);
    });

    it('주어진 책 목록만큼 bookCover 렌더링 해야한다.', () => {
      const bookCover = screen.getByTestId(`bookCover-${mockBooks[0].isbn}`);
      expect(bookCover).toBeInTheDocument();
    });

    it('readingLogId가 있는 bookCover 클릭하면 onCoverClick 함수가 isbn, readingLogId 인자와 함께 호출되어야 한다.', async () => {
      const bookCover = screen.getByTestId(`bookCover-${mockBooks[0].isbn}`);

      await userEvent.click(bookCover);

      expect(mockOnCoverClick).toHaveBeenCalledTimes(1);
      expect(mockOnCoverClick).toHaveBeenCalledWith(mockBooks[0].isbn, mockBooks[0].readingLogId);
    });
  });

  describe('readingLogId가 없는 BookCoverList', () => {
    beforeEach(() => {
      mockOnCoverClick.mockClear();
      render(<BookCoverList books={mockBooksWithoutReadingLogId} onCoverClick={mockOnCoverClick} />);
    });

    it('readingLog가 없는 bookCover 클릭하면 onCoverClick 함수가 isbn 인자와 힘께 호출되어야 한다.', async () => {
      const bookCover = screen.getByTestId(`bookCover-${mockBooksWithoutReadingLogId[0].isbn}`);
      await userEvent.click(bookCover);

      expect(mockOnCoverClick).toHaveBeenCalledTimes(1);
      expect(mockOnCoverClick).toHaveBeenCalledWith(mockBooksWithoutReadingLogId[0].isbn);
    });
  });

  describe('빈 BookCoverList', () => {
    beforeEach(() => {
      mockOnCoverClick.mockClear();
      render(<BookCoverList books={[]} onCoverClick={mockOnCoverClick} />);
    });

    it('아무것도 렌더링되지 말아야한다.', () => {
      const bookCover = screen.queryByAltText('bookCover');
      expect(bookCover).toBeNull();
    });
  });
});
