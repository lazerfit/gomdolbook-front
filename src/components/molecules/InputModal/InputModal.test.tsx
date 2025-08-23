import { beforeEach, describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import InputModal from '@/components/molecules/InputModal/InputModal';
import userEvent from '@testing-library/user-event';

const mockClose = vi.fn();
const mockOnSuccess = vi.fn();

describe('InputModal', () => {
  describe('modal이 열려있다', () => {
    beforeEach(() => {
      render(<InputModal isOpen={true} close={mockClose} onSuccess={mockOnSuccess} />);
    });
    it('Input이 렌더링되어야 한다.', () => {
      const input = screen.getByPlaceholderText('새 컬렉션 이름을 입력해주세요.');
      expect(input).toBeInTheDocument();
    });

    it('확인 버튼을 누르면 onSuccess 함수가 호출되어야 한다.', async () => {
      const btn = screen.getByText('확인');

      await userEvent.click(btn);

      expect(mockOnSuccess).toBeCalledTimes(1);
    });

    it('취소 버튼을 누르면 onSuccess 함수가 호출되어야 한다.', async () => {
      const btn = screen.getByText('취소');

      await userEvent.click(btn);

      expect(mockClose).toBeCalledTimes(1);
    });
  });

  describe('Modal이 닫혀있다.', () => {
    beforeEach(() => {
      render(<InputModal isOpen={false} close={mockClose} onSuccess={mockOnSuccess} />);
    });

    it('Input이 렌더링 되지 않아야한다.', () => {
      const input = screen.queryByPlaceholderText('새 컬렉션 이름을 입력해주세요.');
      expect(input).toBeNull();
    });
  });
});
