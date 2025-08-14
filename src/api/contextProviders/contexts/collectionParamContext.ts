import { createContext } from 'react';

export interface CollectionParam {
  isCollection: boolean;
  name: string;
}

export const CollectionParamContext = createContext<CollectionParam>({
  isCollection: false,
  name: '',
});
