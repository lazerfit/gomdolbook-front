import { ReactNode } from 'react';
import { CollectionParamContext, CollectionParam } from './contexts/collectionParamContext.ts';

interface Props {
  collectionParam: CollectionParam;
  children: ReactNode;
}

const ParamContextProvider = ({ collectionParam, children }: Props) => {
  return <CollectionParamContext.Provider value={collectionParam}>{children}</CollectionParamContext.Provider>;
};

export default ParamContextProvider;
