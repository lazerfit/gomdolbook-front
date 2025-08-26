import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from 'src/test-utils';
import userEvent from '@testing-library/user-event';
import CollectionDetailPage from 'src/components/pages/CollectionDetailPage';
import { mockUseKeycloak, mockNavigate } from 'src/setupTests';

describe('CollectionDetailPage', () => {
  beforeEach(() => {
    mockUseKeycloak.mockReturnValue({
      keycloak: {
        authenticated: true,
      },
    } as never);
    render(<CollectionDetailPage />, { initialEntries: ['/collections/1'], path: '/collections/:id' });
  });

  it('bookCover가 렌더링되어야 한다.', async () => {
    const cover = await screen.findByAltText('bookCover');
    expect(cover).toBeInTheDocument();
  });

  it('bookCover를 클릭하면 모달창이 열려야 한다.', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    const cover = await screen.findByTestId('bookCover-isbn');
    await user.click(cover);
    const removeButton = await screen.findByTestId('remove-book-collection-button');
    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);

    expect(removeButton).not.toBeInTheDocument();
  });

  it('상태변경 아이콘을 클릭하면 상태변경 버튼이 렌더링되어야 한다.', async () => {
    const cover = await screen.findByTestId('bookCover-isbn');
    await userEvent.click(cover);
    expect(await screen.findByText('책 소개')).toBeInTheDocument();
    const btn = await screen.findByTestId('change-status-btn');
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);

    expect(await screen.findByTestId('status-button-READING'));
  });

  it('설정 버튼을 누르면 삭제, edit 버튼이 렌더링되어야 한다.', async () => {
    const settingButton = await screen.findByTestId('collection-setting-button');
    expect(settingButton);
    await userEvent.click(settingButton);

    expect(await screen.findByTestId('collection-delete-button'));
    expect(await screen.findByTestId('collection-edit-button'));
  });

  it('delete button을 클릭하면 collections 페이지로 이동해야 한다.', async () => {
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    const settingButton = await screen.findByTestId('collection-setting-button');
    expect(settingButton);
    await userEvent.click(settingButton);

    const deleteButton = await screen.findByTestId('collection-delete-button');
    await userEvent.click(deleteButton);

    expect(mockNavigate).toBeCalledWith('/collections');
  });

  it('rename 버튼을 클릭하면 모달창이 렌더링되고, 새로운 컬렉션 이름을 입력 후 확인버튼을 누르면 모달창이 닫혀야 한다.', async () => {
    const user = userEvent.setup();
    const settingButton = await screen.findByTestId('collection-setting-button');
    expect(settingButton);
    await user.click(settingButton);

    const editButton = await screen.findByTestId('collection-edit-button');
    await user.click(editButton);
    const input = await screen.findByPlaceholderText('새 컬렉션 이름을 입력해주세요.');
    expect(input).toBeInTheDocument();

    await user.type(input, 'test input');
    const confirmButton = await screen.findByText('확인');
    await user.click(confirmButton);

    expect(input).not.toBeInTheDocument();
  });
});
