import { testQueryClient } from '@/api/services/config/testQueryClient.ts';
import Theme from '@/styles/theme.tsx';
import { QueryClientProvider, QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import React, { ReactElement, ReactNode } from 'react';
import { render, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import RefetchContextProvider from '@/api/contextProviders/RefetchProvider.tsx';
import { vi, it, describe, beforeAll, beforeEach, afterAll, afterEach, expect } from 'vitest';
import ParamContextProvider from '@/api/contextProviders/CollectionParamProvider.tsx';

interface Options {
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>;
  params?: { isCollection: boolean; name: string };
}

const customRender = (
  ui: ReactElement,
  { refetch = vi.fn(), params = { isCollection: false, name: 'name' } }: Options = {},
): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Theme>
        <QueryClientProvider client={testQueryClient}>
          <ParamContextProvider collectionParam={params}>
            <RefetchContextProvider refetch={refetch}>{children}</RefetchContextProvider>
          </ParamContextProvider>
        </QueryClientProvider>
      </Theme>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export { render, screen, fireEvent, waitFor, it, describe, beforeAll, beforeEach, afterAll, afterEach, expect, vi };
export { customRender };
