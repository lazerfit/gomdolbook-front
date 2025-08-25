import { testQueryClient } from '@/api/services/config/testQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

interface CustomRenderOption extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  path?: string;
}

const customRender = (ui: ReactElement, options?: CustomRenderOption): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const { initialEntries = ['/'], path = '/' } = options ?? {};
    return (
      <QueryClientProvider client={testQueryClient}>
        <MemoryRouter
          initialEntries={initialEntries}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export { customRender as render };
