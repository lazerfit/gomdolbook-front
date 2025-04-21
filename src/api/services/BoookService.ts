import { BookEndPoint } from "@/api/services/config/apiEndpoints.ts";
import * as T from "./types/booktypes.ts";
import { ApiRequest } from "@/api/services/config/request.ts";

export const BookService = {
  getBook: (isbn: string) => {
    return ApiRequest<T.BookResponse>(BookEndPoint.getBook(isbn), "GET");
  },
  getReadingLog: (isbn: string) => {
    return ApiRequest<T.ReadingLogResponse>(BookEndPoint.getReadingLog(), "GET", {
      params: { isbn },
    });
  },
  updateReadingLog: (data: T.ReadingLogUpdateRequest) => {
    return ApiRequest<void>(BookEndPoint.updateReadingLog(), "POST", { data: data });
  },
  updateRating: (isbn: string, star: number) => {
    return ApiRequest<void>(BookEndPoint.updateRating(), "POST", {
      params: { isbn, star },
    });
  },
  saveBook: (data: T.BookSaveRequest) => {
    return ApiRequest<void>(BookEndPoint.saveBook(), "POST", { data: data });
  },
  getStatus: (isbn: string) => {
    return ApiRequest<T.StatusResponse>(BookEndPoint.getStatus(isbn), "GET");
  },
  updateStatus: (isbn: string, status: string) => {
    return ApiRequest<void>(BookEndPoint.updateStatus(isbn), "POST", {
      params: { status },
    });
  },
  getBookSearchResult: (q: string) => {
    return ApiRequest<T.BookSearchResponse[]>(BookEndPoint.getBookSearchResult(), "GET", {
      params: { q },
    });
  },
  getLibrary: (status: string) => {
    return ApiRequest<T.LibraryResponse[]>(BookEndPoint.getLibrary(), "GET", {
      params: { status },
    });
  },
};
