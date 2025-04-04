import { testQueryClient } from "@/api/services/config/testQueryClient.ts";
import Theme from "@/styles/theme.tsx";
import {
  QueryClientProvider,
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RefetchContextProvider from "@/api/contextProviders/RefetchProvider.tsx";
import {
  vi,
  it,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  expect,
} from "vitest";
import ParamContextProvider from "@/api/contextProviders/CollectionParamProvider.tsx";

interface Options {
  refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>;
  params?: { isCollection: boolean; name: string };
}

const customRender = (
  ui: React.ReactElement,
  { refetch = vi.fn(), params = { isCollection: false, name: "name" } }: Options = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Theme>
        <div id="modal"></div>
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

export {
  render,
  screen,
  fireEvent,
  waitFor,
  it,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  expect,
  vi,
};
export { customRender };
