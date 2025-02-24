import { RefetchContext } from "../contexts/refetchContext.ts";
import { useContext } from "react";

export const useRefetch = () => {
  const context = useContext(RefetchContext);
  if (!context) {
    throw new Error("useRefetch는 Provider 안에서 사용되어야합니다.");
  }

  return context;
};
