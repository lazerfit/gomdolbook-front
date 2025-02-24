import request from "@/api/services/config/Request.ts";
import { CollectionEndPoint } from "./config/apiEndpoints.ts";
import type { IApiResponse, ILibraryResponse, IBookSaveRequest } from "./BoookService.ts";

export interface ICollectionResponse {
  name: string;
  books: IBookCover;
}

export interface IBookCover {
  covers: string[];
}

export const collectionService = {
  getList: () => {
    return request<IApiResponse<ICollectionResponse[]>>({
      url: CollectionEndPoint.getList(),
      method: "GET",
    });
  },
  getOne: (name: string) => {
    return request<IApiResponse<ILibraryResponse[]>>({
      url: CollectionEndPoint.getOne(name),
      method: "GET",
    });
  },
  create: (name: string) => {
    return request<void>({
      url: CollectionEndPoint.create(),
      params: { name: name },
      method: "POST",
    });
  },
  addBook: (data: IBookSaveRequest, name: string) => {
    return request<void>({
      url: CollectionEndPoint.addBook(name),
      data: data,
      method: "POST",
    });
  },
};
