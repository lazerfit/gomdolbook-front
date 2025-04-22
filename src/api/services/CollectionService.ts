import { CollectionEndPoint } from "./config/apiEndpoints.ts";
import { ApiRequest } from "@/api/services/config/request.ts";
import { LibraryResponse, BookSaveRequest } from "@/api/services/types/booktypes.js";

export interface CollectionResponse {
  name: string;
  books: BookCover;
}

export interface BookCover {
  covers: string[];
}

export const collectionService = {
  getList: () => {
    return ApiRequest<CollectionResponse[]>(CollectionEndPoint.getList(), "GET");
  },
  getOne: (name: string) => {
    return ApiRequest<LibraryResponse[]>(CollectionEndPoint.getOne(name), "GET");
  },
  create: (name: string) => {
    return ApiRequest<void>(CollectionEndPoint.create(), "POST", { params: { name } });
  },
  delete: (name: string) => {
    return ApiRequest<void>(CollectionEndPoint.delete(), "DELETE", { params: { name } });
  },
  addBook: (data: BookSaveRequest, name: string) => {
    return ApiRequest<void>(CollectionEndPoint.addBook(name), "POST", { data });
  },
  removeBook: (isbn: string, name: string) => {
    return ApiRequest<void>(CollectionEndPoint.removeBook(name), "DELETE", {
      params: { isbn },
    });
  },
};
