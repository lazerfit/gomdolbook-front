import { beforeEach, describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import ReadingLogBookInfo from '@/components/molecules/ReadingLogBookInfo/ReadingLogBookInfo';
import { BookStatus } from '@/api/services/types';

const mockOnRatingClick = vi.fn();
const mockOnStatusClick = vi.fn();
const mockReadingLogResponse = {
  id: 1,
  title: 'testTitle',
  author: 'testAuthor',
  cover: 'testCover',
  publisher: 'testPublisher',
  status: BookStatus.READING,
  summary: 'testSummary',
  note: 'testNotes',
  rating: 5,
  startedAt: '2025-08-15',
  finishedAt: '2025-08-16',
};

describe('ReadingLogBookInfo', () => {
  beforeEach(() => {
    render(
      <ReadingLogBookInfo
        onRatingClick={mockOnRatingClick}
        onStatusClick={mockOnStatusClick}
        readingLog={mockReadingLogResponse}
      />,
    );
  });
  it('title, author 등 기본정보가 렌더링되어야 한다.', () => {
    const title = screen.getByText('testTitle');
    const author = screen.getByText('testAuthor');
    const date = screen.getByText('250815 - 250816');

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

  it('rating을 누르면 onRatingClick 함수가 호출되어야 한다.', async () => {
    const rating = screen.getByTestId('rating-1');
    await userEvent.click(rating);

    expect(mockOnRatingClick).toBeCalledTimes(1);
  });

  it('status를 누르면 onStatusClick 함수가 호출되어야 한다.', async () => {
    const status = screen.getByTestId('status-READING');
    await userEvent.click(status);

    expect(mockOnStatusClick).toBeCalledTimes(1);
  });
});
