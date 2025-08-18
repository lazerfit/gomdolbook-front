import { testQueryClient } from '@/api/services/config/testQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui: ReactElement): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={testQueryClient}>
        <MemoryRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
          {children}
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export { customRender as render };
