import { CollectionEndPoint } from './config/APIEndpoints';
import { APIRequest } from '@/api/services/config/request';
import { BookSaveRequest, CollectionDetailResponse } from '@/api/services/types/booktypes';

export interface CollectionsResponse {
  id: number;
  name: string;
  covers: string[];
}

export interface BookCover {
  covers: string[];
}

export interface CollectionCreateRequest {
  name: string;
}

export const collectionService = {
  getList: () => {
    return APIRequest<CollectionsResponse[]>(CollectionEndPoint.getList(), 'GET');
  },
  getOne: (id: number) => {
    return APIRequest<CollectionDetailResponse>(CollectionEndPoint.getOne(id), 'GET');
  },
  create: (name: string) => {
    const data: CollectionCreateRequest = { name };
    return APIRequest<void>(CollectionEndPoint.create(), 'POST', { data });
  },
  delete: (id: number) => {
    return APIRequest<void>(CollectionEndPoint.delete(id), 'DELETE');
  },
  addBook: (data: BookSaveRequest, id: number) => {
    return APIRequest<void>(CollectionEndPoint.addBookToCollection(id), 'POST', {
      data,
    });
  },
  removeBook: (isbn: string, id: number) => {
    return APIRequest<void>(CollectionEndPoint.removeBookFromCollection(id, isbn), 'DELETE');
  },
  isExistBookInCollection: (name: string, isbn: string) => {
    return APIRequest<boolean>(CollectionEndPoint.isExistBookInCollection(name, isbn), 'GET');
  },
  renameCollection: (id: number, name: string) => {
    return APIRequest<void>(CollectionEndPoint.renameCollection(id), 'PATCH', {
      data: { name },
    });
  },
};
