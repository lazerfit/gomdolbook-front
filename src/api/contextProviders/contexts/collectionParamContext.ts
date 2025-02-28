import { createContext } from "react";

export interface CollectionParam {
  isCollection: boolean;
  name: string;
}

export const ParamContext = createContext<CollectionParam>({
  isCollection: false,
  name: "",
});
