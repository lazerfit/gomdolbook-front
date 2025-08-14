import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { createContext } from 'react';

export interface RefetchContextType {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>;
}

export interface DefaultValue {
  refetch: () => Promise<{ data: undefined; error: null }>;
}

export const RefetchContext = createContext<RefetchContextType | DefaultValue>({
  refetch: async () => Promise.resolve({ data: undefined, error: null }),
});
