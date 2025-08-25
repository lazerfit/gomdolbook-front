import { beforeEach, describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import CreateCollectionForm from '@/components/molecules/CreateCollectionForm/CreateCollectionForm';
import userEvent from '@testing-library/user-event';

const mockOnCreate = vi.fn();

describe('CreateCollectionForm', () => {
  beforeEach(() => {
    render(<CreateCollectionForm onCreate={mockOnCreate} />);
  });

  it('컬렉션 추가 버튼이 렌더링 된어야한다.', () => {
    const btn = screen.getByTestId('create-collection-button');

    expect(btn).toBeInTheDocument();
  });

  it('컬렉션 추가 버튼을 클릭하면 입력창이 렌더링되어야한다.', async () => {
    const btn = screen.getByTestId('create-collection-button');

    await userEvent.click(btn);

    const input = screen.getByPlaceholderText('컬렉션 이름을 입력해주세요...');
    expect(input).toBeInTheDocument();
  });

  it('닫기 버튼을 클릭하면 입력창이 사라져야한다.', async () => {
    const btn = screen.getByTestId('create-collection-button');
    await userEvent.click(btn);

    const input = screen.getByPlaceholderText('컬렉션 이름을 입력해주세요...');
    expect(input).toBeInTheDocument();
    const closeBtn = screen.getByTestId('close-create-collection-button');
    await userEvent.click(closeBtn);

    expect(input).not.toBeInTheDocument();
  });

  it('Enter 버튼을 누르면 onCreate 함수가 호출되어야 한다.', async () => {
    const btn = screen.getByTestId('create-collection-button');
    await userEvent.click(btn);

    const input = screen.getByPlaceholderText('컬렉션 이름을 입력해주세요...');
    await userEvent.type(input, 'test');
    await userEvent.keyboard('{Enter}');

    expect(mockOnCreate).toBeCalledTimes(1);
  });
});
