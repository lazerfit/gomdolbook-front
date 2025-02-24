import { ReactNode } from "react";
import { RefetchContext, RefetchContextType } from "./contexts/refetchContext.ts";

interface Props {
  refetch: RefetchContextType["refetch"];
  children: ReactNode;
}

const RefetchContextProvider = ({ refetch, children }: Props) => {
  return (
    <RefetchContext.Provider value={{ refetch }}>{children}</RefetchContext.Provider>
  );
};

export default RefetchContextProvider;
