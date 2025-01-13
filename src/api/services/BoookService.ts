import request from "../Request";
import { BookEndPoint } from "./config/apiEndpoints";

export interface IBookResponse {
  title: string;
  author: string;
  pubDate: string;
  description: string;
  isbn13: string;
  cover: string;
  categoryName: string;
  publisher: string;
}

export const BookService = {
  getBook: async (isbn: string) => {
    return request<IBookResponse>({
      url: BookEndPoint.getBook(isbn),
      method: "GET",
    });
  },
  getReadingLog: async (isbn: string) => {
    return request({
      url: BookEndPoint.getReadingLog(isbn),
      method: "GET",
    });
  },
};
