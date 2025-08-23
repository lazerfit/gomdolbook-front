import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import StatusButton from '@/components/molecules/StatusButton/StatusButton';
import { BookStatus } from '@/api/services/types';

const mockOnSave = vi.fn();
const mockStatus = BookStatus.READING;

describe('StatusButton', () => {
  beforeEach(() => {
    render(<StatusButton onSave={mockOnSave} status={mockStatus} />);
  });

  it('button이 렌더링되어야 한다.', () => {
    const btn = screen.getByTestId('status-button-READING');

    expect(btn).toBeInTheDocument();
  });

  it('button을 클릭하면 onSave 함수가 호출되어야 한다.', async () => {
    const btn = screen.getByTestId('status-button-FINISHED');
    await userEvent.click(btn);

    expect(mockOnSave).toBeCalledTimes(1);
  });

  it('READING status는 클릭이 안되어야한다.', async () => {
    const btn = screen.getByTestId('status-button-READING');
    await userEvent.click(btn);

    expect(mockOnSave).not.toBeCalled();
  });
});
