import { beforeEach, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import ReadingLogPage from '@/components/pages/ReadingLogPage';

vi.mock('@react-keycloak/web', () => ({
  useKeycloak: () => ({
    keycloak: {
      authenticated: true,
    },
    initialized: true,
  }),
}));

describe('ReadingLogPage', () => {
  beforeEach(() => {
    render(<ReadingLogPage />, { initialEntries: ['/readingLog/isbn/1'], path: '/readingLog/:isbn/:id' });
  });

  it('readingLog 기본정보가 렌더링되어야 한다.', async () => {
    const cover = await screen.findByAltText('cover');
    expect(cover).toBeInTheDocument();
  });

  it('summaryEditButton을 클릭하면 summary note가 렌더링되어야 한다.', async () => {
    const btn = await screen.findAllByTestId('readingLog-edit-button');
    await userEvent.click(btn[0]);

    expect(await screen.findByPlaceholderText('나만의 언어로 내용을 요약해보세요. . .')).toBeInTheDocument();
  });
});
