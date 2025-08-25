import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import UserMenu from '@/components/organisms/Header/UserMenu';
import { mockNavigate, mockUseKeycloak } from '@/setupTests';

vi.mock('framer-motion');
const mockLogout = vi.fn();

describe('UserMenu', () => {
  beforeEach(() => {
    mockUseKeycloak.mockReturnValue({
      keycloak: {
        authenticated: false,
      },
    } as never);
    render(<UserMenu onLoggedOut={mockLogout} />);
  });

  it('Library, Collection, Log Out이 렌더링되어야 한다.', () => {
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Collection')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('Library를 클릭하면 library 페이지로 이동해야한다.', async () => {
    const btn = screen.getByText('Library');
    const menu = screen.getByText('menu');
    await userEvent.click(menu);
    await userEvent.click(btn);

    expect(mockNavigate).toBeCalledWith('/library/READING');
  });

  it('Collection을 클릭하면 collections 페이지로 이동해야한다.', async () => {
    const btn = screen.getByText('Collection');
    const menu = screen.getByText('menu');
    await userEvent.click(menu);
    await userEvent.click(btn);

    expect(mockNavigate).toBeCalledWith('/collections');
  });

  it('Log out 버튼을 클릭하면 onLoggedOut 함수가 호출되어야 한다.', async () => {
    const btn = screen.getByText('Log out');
    const menu = screen.getByText('menu');
    await userEvent.click(menu);
    await userEvent.click(btn);

    expect(mockLogout).toBeCalledTimes(1);
  });
});
