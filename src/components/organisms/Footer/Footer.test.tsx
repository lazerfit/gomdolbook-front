import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import Footer from '@/components/organisms/Footer/Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('문구가 렌더링되어야 한다.', () => {
    const letter = screen.getByText('@Designed By lazerfit');
    expect(letter).toBeInTheDocument();
  });
});
