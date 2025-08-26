import { beforeEach, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import NotFoundPage from '@/components/pages/NotFoundPage';
import { mockNavigate } from '@/setupTests';

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(<NotFoundPage />);
  });

  it('문구가 렌더링되어야 한다.', () => {
    const subTitle = screen.getByText("The page you're looking for doesn't exist.");
    expect(subTitle).toBeInTheDocument();
  });

  it('Back 버튼을 누르면 LandingPage로 이동해야 한다.', async () => {
    const btn = screen.getByText('Back');
    await userEvent.click(btn);

    expect(mockNavigate).toBeCalledWith('/');
  });
});
