import { CollectionEndPoint } from "./config/apiEndpoints.ts";
import { ApiRequest } from "@/api/services/config/request.ts";
import {
  BookSaveRequest,
  CollectionBookMetaResponse,
} from "@/api/services/types/booktypes.js";

export interface CollectionResponse {
  name: string;
  books: BookCover;
}

export interface BookCover {
  covers: string[];
}

export interface CollectionCreateRequest {
  name: string;
}

export const collectionService = {
  getList: () => {
    return ApiRequest<CollectionResponse[]>(CollectionEndPoint.getList(), "GET");
  },
  getOne: (name: string) => {
    return ApiRequest<CollectionBookMetaResponse[]>(
      CollectionEndPoint.getOne(name),
      "GET",
    );
  },
  create: (name: string) => {
    const data: CollectionCreateRequest = { name };
    return ApiRequest<void>(CollectionEndPoint.create(), "POST", { data });
  },
  delete: (name: string) => {
    return ApiRequest<void>(CollectionEndPoint.delete(name), "DELETE");
  },
  addBook: (data: BookSaveRequest, name: string) => {
    return ApiRequest<void>(CollectionEndPoint.addBookToCollection(name), "POST", {
      data,
    });
  },
  removeBook: (isbn: string, name: string) => {
    return ApiRequest<void>(
      CollectionEndPoint.removeBookFromCollection(name, isbn),
      "DELETE",
    );
  },
  isExistBookInCollection: (name: string, isbn: string) => {
    return ApiRequest<boolean>(
      CollectionEndPoint.isExistBookInCollection(name, isbn),
      "GET",
    );
  },
};
