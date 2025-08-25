import { BookResponse, BookStatus } from '@/api/services/types';

export const createBookPayload = (status: BookStatus, bookData: BookResponse) => {
  return {
    title: bookData.title,
    author: bookData.author,
    pubDate: bookData.pubDate,
    description: bookData.description,
    isbn: bookData.isbn,
    cover: bookData.cover,
    categoryName: bookData.categoryName,
    publisher: bookData.publisher,
    status: status ?? null,
  };
};
