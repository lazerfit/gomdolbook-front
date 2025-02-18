import request from "@/api/services/config/Request.ts";
import { BookEndPoint } from "@/api/services/config/apiEndpoints.ts";

export interface IApiResponse<T> {
  data: T;
}

export interface IBookResponse {
  title: string;
  author: string;
  pubDate: string;
  description: string;
  isbn13: string;
  cover: string;
  categoryName?: string;
  publisher: string;
}

export interface IBookSaveRequest extends IBookResponse {
  status: BookStatus;
}

export interface ILibraryResponse {
  cover: string;
  title: string;
  isbn: string;
}

export enum BookStatus {
  READING = "READING",
  TO_READ = "TO_READ",
  FINISHED = "FINISHED",
}

export const BookService = {
  getBook: (isbn: string) => {
    return request<IApiResponse<IBookResponse>>({
      url: BookEndPoint.getBook(isbn),
      method: "GET",
    });
  },
  getReadingLog: (isbn: string) => {
    return request<void>({
      url: BookEndPoint.getReadingLog(isbn),
      method: "GET",
    });
  },
  saveReadingLog: (data: IBookSaveRequest) => {
    return request<void>({
      url: BookEndPoint.saveReadingLog(),
      method: "POST",
      data: data,
    });
  },
  getStatus: (isbn: string) => {
    return request<IApiResponse<string>>({
      url: BookEndPoint.getStatus(isbn),
      method: "GET",
    });
  },
  getBookSearchResult: (q: string) => {
    return request<IApiResponse<IBookResponse[]>>({
      url: BookEndPoint.getBookSearchResult(),
      method: "GET",
      params: { q: q },
    });
  },
  getLibrary: (status: string) => {
    return request<IApiResponse<ILibraryResponse[]> | void>({
      url: BookEndPoint.getLibrary(),
      method: "GET",
      params: { status: status },
    });
  },
};
