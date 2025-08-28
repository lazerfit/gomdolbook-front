import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import CollectionDetailModal from '@/components/organisms/CollectionDetailModal/CollectionDetailModal';
import userEvent from '@testing-library/user-event';

vi.mock('react-tooltip');
vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    keycloak: {
      authenticated: true,
    },
    initialized: true,
  }),
}));

const mockOnClose = vi.fn();
const mockOnRemove = vi.fn();

describe('CollectionDetailModal', () => {
  beforeEach(() => {
    render(<CollectionDetailModal close={mockOnClose} onRemove={mockOnRemove} isbn={'isbn'} isOpen={true} />, {
      initialEntries: ['/detail/1234567890'],
      path: '/detail/:isbn',
    });
  });

  it('제목과 제거, 상태 변경 버튼 등이 렌더링되어야 한다.', async () => {
    const title = await screen.findByText('title');
    const removeBtn = screen.getByTestId('remove-book-collection-button');
    const statusBtn = screen.getByTestId('change-status-btn');

    expect(title).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    expect(statusBtn).toBeInTheDocument();
  });

  it('제거버튼을 누르면 onRemove 함수가 호출되어야 한다.', async () => {
    const removeBtn = await screen.findByTestId('remove-book-collection-button');
    await userEvent.click(removeBtn);

    expect(mockOnRemove).toBeCalledTimes(1);
  });

  it('상태변경 버튼을 누르면 statusEditMode가 활성화되어야 한다.', async () => {
    const statusBtn = await screen.findByTestId('change-status-btn');
    await userEvent.click(statusBtn);
    const status = screen.getByTestId('status-button-FINISHED');

    expect(status).toBeInTheDocument();
  });

  it('statusButton을 누르면 statusEditMode가 활성화되어야 한다.', async () => {
    const statusBtn = await screen.findByTestId('change-status-btn');
    await userEvent.click(statusBtn);
    const status = screen.getByTestId('status-button-FINISHED');

    await userEvent.click(status);
  });
});
