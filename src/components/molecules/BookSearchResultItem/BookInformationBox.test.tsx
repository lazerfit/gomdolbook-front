import { beforeEach, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import BookInformationBox from './BookInformationBox';

describe('BookInformationBox', () => {
  beforeEach(() => {
    render(<BookInformationBox author="author" publisher="publisher" publicationDate="2025-08-15" />);
  });

  it('작가, 출판사, 출판일이 렌더링되어야 한다.', () => {
    const author = screen.getByText('author');
    const publisher = screen.getByText('publisher');
    const pubDate = screen.getByText('2025년 08월');

    expect(author).toBeInTheDocument();
    expect(publisher).toBeInTheDocument();
    expect(pubDate).toBeInTheDocument();
  });
});
