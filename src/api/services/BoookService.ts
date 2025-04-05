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
  status?: BookStatus | null;
}

export interface ILibraryResponse {
  cover: string;
  title: string;
  isbn: string;
  status: string;
}

export interface IReadingLogResponse {
  title: string;
  author: string;
  pubDate: string;
  cover: string;
  publisher: string;
  status: string;
  note1: string;
  note2: string;
  note3: string;
  rating: number;
}

export interface IReadingLogUpdateRequest {
  isbn: string;
  note: string;
  text: string;
}

export interface IStatusResponse {
  status: string;
}

export enum BookStatus {
  READING = "READING",
  TO_READ = "TO_READ",
  FINISHED = "FINISHED",
  NEW = "NEW",
  EMPTY = "EMPTY",
}

export const BookService = {
  getBook: (isbn: string) => {
    return request<IApiResponse<IBookResponse>>({
      url: BookEndPoint.getBook(isbn),
      method: "GET",
    });
  },
  getReadingLog: (isbn: string) => {
    return request<IApiResponse<IReadingLogResponse>>({
      url: BookEndPoint.getReadingLog(),
      method: "GET",
      params: { isbn: isbn },
    });
  },
  updateReadingLog: (data: IReadingLogUpdateRequest) => {
    return request<void>({
      url: BookEndPoint.updateReadingLog(),
      method: "POST",
      data: data,
    });
  },
  updateRating: (isbn: string, star: number) => {
    return request<void>({
      url: BookEndPoint.updateRating(),
      method: "POST",
      params: { isbn: isbn, star: star },
    });
  },
  saveBook: (data: IBookSaveRequest) => {
    return request<void>({
      url: BookEndPoint.saveBook(),
      method: "POST",
      data: data,
    });
  },
  getStatus: (isbn: string) => {
    return request<IApiResponse<IStatusResponse>>({
      url: BookEndPoint.getStatus(isbn),
      method: "GET",
    });
  },
  updateStatus: (isbn: string, status: string) => {
    return request<void>({
      url: BookEndPoint.updateStatus(isbn),
      method: "POST",
      params: { status: status },
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
