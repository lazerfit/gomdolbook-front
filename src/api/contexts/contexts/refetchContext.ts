import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext } from "react";

export interface RefetchContextType {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>;
}

export const RefetchContext = createContext<RefetchContextType | null>(null);
