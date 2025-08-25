import { BookEndPoint } from '@/api/services/config/APIEndpoints';
import * as T from './types/booktypes';
import { APIRequest } from '@/api/services/config/request';

export const BookService = {
  getBook: (isbn: string) => {
    return APIRequest<T.BookResponse>(BookEndPoint.getBook(isbn), 'GET');
  },
  saveBook: (data: T.BookSaveRequest) => {
    return APIRequest<void>(BookEndPoint.saveBook(), 'POST', { data: data });
  },
  getStatus: (isbn: string) => {
    return APIRequest<T.StatusResponse>(BookEndPoint.getStatus(isbn), 'GET');
  },
  updateStatus: (isbn: string, status: string) => {
    return APIRequest<void>(BookEndPoint.updateStatus(isbn), 'PATCH', {
      params: { status },
    });
  },
  getBookSearchResult: (q: string) => {
    return APIRequest<T.BookSearchResponse[]>(BookEndPoint.getBookSearchResult(), 'GET', {
      params: { q },
    });
  },
  getLibrary: (status: string) => {
    return APIRequest<T.StatusBooksResponse[]>(BookEndPoint.getLibrary(), 'GET', {
      params: { status },
    });
  },
  getFinishedBookCalendarData: () => {
    return APIRequest<T.FinishedBookData[]>(BookEndPoint.getFinishedBookCalendarData(), 'GET');
  },
};
