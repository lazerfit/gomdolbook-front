import { ReactNode } from "react";
import { ParamContext, CollectionParam } from "./contexts/collectionParamContext.ts";

interface Props {
  collectionParam: CollectionParam;
  children: ReactNode;
}

const ParamContextProvider = ({ collectionParam, children }: Props) => {
  return (
    <ParamContext.Provider value={collectionParam}>{children}</ParamContext.Provider>
  );
};

export default ParamContextProvider;
