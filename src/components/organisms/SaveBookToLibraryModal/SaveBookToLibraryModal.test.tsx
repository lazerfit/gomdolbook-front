import { beforeEach, vi } from 'vitest';
import { render } from '@/test-utils';
import SaveBookToLibraryModal from '@/components/organisms/SaveBookToLibraryModal/SaveBookToLibraryModal';
import { BookStatus } from '@/api/services/types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockClose = vi.fn();
const mockOnSave = vi.fn();

describe('SaveBookToLibraryModal', () => {
  beforeEach(() => {
    render(<SaveBookToLibraryModal onSave={mockOnSave} close={mockClose} isOpen={true} status={BookStatus.READING} />);
  });

  it('title이 렌더링되어야 한다.', () => {
    expect(screen.getByText('내 서재 저장')).toBeInTheDocument();
  });

  it('status 버튼이 렌더링되어야 한다.', () => {
    expect(screen.getByTestId('status-button-FINISHED')).toBeInTheDocument();
  });

  it('FINISHED 버튼을 누르면 onSave 함수가실행되어야 한다.', async () => {
    const btn = screen.getByTestId('status-button-FINISHED');
    await userEvent.click(btn);

    expect(mockOnSave).toBeCalledTimes(1);
  });

  it('READING 버튼이 클릭되지않아야 한다.', async () => {
    const btn = screen.getByTestId('status-button-READING');
    await userEvent.click(btn);

    expect(mockOnSave).not.toBeCalled();
  });
});
