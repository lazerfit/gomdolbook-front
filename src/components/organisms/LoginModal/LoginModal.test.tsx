import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import LoginModal from '@/components/organisms/LoginModal';

const mockClose = vi.fn();
const mockKakao = vi.fn();
const mockGithub = vi.fn();
const mockGoogle = vi.fn();

describe('LoginModal', () => {
  beforeEach(() => {
    render(<LoginModal isOpen={true} close={mockClose} github={mockGithub} kakao={mockKakao} google={mockGoogle} />);
  });

  it('카카오, 깃헙, 구글이 렌더링되어야 한다.', () => {
    expect(screen.getByAltText('카카오 로그인')).toBeInTheDocument();
    expect(screen.getByAltText('깃헙 로그인')).toBeInTheDocument();
    expect(screen.getByAltText('구글 로그인')).toBeInTheDocument();
  });

  it('카카오 로그인 버튼을 클릭하면 kakao 함수가 실행되어야 한다.', async () => {
    const btn = screen.getByAltText('카카오 로그인');
    await userEvent.click(btn);

    expect(mockKakao).toBeCalledTimes(1);
  });

  it('깃헙 로그인 버튼을 클릭하면 github 함수가 실행되어야 한다.', async () => {
    const btn = screen.getByAltText('깃헙 로그인');
    await userEvent.click(btn);

    expect(mockGithub).toBeCalledTimes(1);
  });

  it('구글 로그인 버튼을 클릭하면 google 함수가 실행되어야 한다.', async () => {
    const btn = screen.getByAltText('구글 로그인');
    await userEvent.click(btn);

    expect(mockGoogle).toBeCalledTimes(1);
  });
});
