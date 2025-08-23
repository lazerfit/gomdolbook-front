import { beforeEach, describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import ReadingLogBox from '@/components/molecules/ReadingLogBox/ReadingLogBox';

const mockOnEditClick = vi.fn();
const mockClose = vi.fn();

describe('ReadingLogBox', () => {
  describe('Non edit mode', () => {
    beforeEach(() => {
      render(
        <ReadingLogBox size="small" title="title" onEditClick={mockOnEditClick} close={mockClose} isEditMode={false}>
          <div>children</div>
        </ReadingLogBox>,
      );
    });

    it('title이 렌더링되어야 한다.', () => {
      const title = screen.getByText('title');

      expect(title).toBeInTheDocument();
    });

    it('edit button이 렌더링되어야 한다.', () => {
      const editBtn = screen.getByTestId('readingLog-edit-button');

      expect(editBtn).toBeInTheDocument();
    });

    it('edit button을 클릭하면 onEditClick 함수가 실행되어야 한다.', async () => {
      const editBtn = screen.getByTestId('readingLog-edit-button');
      await userEvent.click(editBtn);

      expect(mockOnEditClick).toBeCalledTimes(1);
    });
  });

  describe('Edit mode', () => {
    beforeEach(() => {
      render(
        <ReadingLogBox size="small" title="title" onEditClick={mockOnEditClick} close={mockClose} isEditMode={true}>
          <div>children</div>
        </ReadingLogBox>,
      );
    });

    it('confirm button이 렌더링되어야 한다.', () => {
      const btn = screen.getByTestId('readingLog-confirm-button');

      expect(btn).toBeInTheDocument();
    });

    it('confirm button을 클릭하면 close 함수가 실행되어야 한다.', async () => {
      const btn = screen.getByTestId('readingLog-confirm-button');
      await userEvent.click(btn);

      expect(mockClose).toBeCalledTimes(1);
    });
  });
});
