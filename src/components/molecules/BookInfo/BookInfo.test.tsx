import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect } from 'vitest';
import BookInfo from './BookInfo';

const mockBookWithSubTitle = {
  title: 'testTitle-subTitle',
  author: 'testAuthor',
  pubDate: '2025-08-15',
  description: 'testDescription',
  cover: 'testCover',
  categoryName: 'testCategoryName',
  publisher: 'testPublisher',
  isbn: 'testIsbn',
};

const mockBookWithoutSubTitle = {
  title: 'testTitle',
  author: 'testAuthor',
  pubDate: '2025-08-15',
  description: 'testDescription',
  cover: 'testCover',
  categoryName: 'testCategoryName',
  publisher: 'testPublisher',
  isbn: 'testIsbn',
};

describe('BookInfo', () => {
  describe('BookInfo With SubTitle', () => {
    beforeEach(() => {
      render(<BookInfo book={mockBookWithSubTitle} />);
    });

    it('mainTitle과 SubTitle이 분리되어 렌더링되어야 한다.', () => {
      const subTitle = screen.getByText('subTitle');
      const mainTitle = screen.getByText('testTitle');
      expect(subTitle).toBeInTheDocument();
      expect(mainTitle).toBeInTheDocument();
    });

    it('기타 책 정보도 렌더링되어야 한다.', () => {
      const author = screen.getByText(mockBookWithSubTitle.author);
      const publisher = screen.getByText(mockBookWithSubTitle.publisher);
      const description = screen.getByText(mockBookWithSubTitle.description);
      const pubDate = screen.getByText('2025년 08월');
      const bookCover = screen.getByAltText('bookCover');

      expect(author).toBeInTheDocument();
      expect(publisher).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(bookCover).toBeInTheDocument();
      expect(pubDate).toBeInTheDocument();
    });
  });

  describe('BookInfo Without SubTitle', () => {
    beforeEach(() => {
      render(<BookInfo book={mockBookWithoutSubTitle} />);
    });

    it('SubTitle이 렌더링되지 않고 mainTitle만 렌더링되어야 한다.', () => {
      const subTitle = screen.queryByText('subTitle');
      const mainTitle = screen.queryByText(mockBookWithoutSubTitle.title);

      expect(subTitle).toBeNull();
      expect(mainTitle).toBeInTheDocument();
    });
  });
});
