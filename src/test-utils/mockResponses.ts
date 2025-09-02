import {
  BookResponse,
  BookSearchResponse,
  BookStatus,
  StatusBooksResponse,
  ReadingLogResponse,
} from '@/api/services/types/booktypes';

interface APIResponse<T> {
  data: T;
}

export const MOCK_BOOK_RESPONSE: APIResponse<BookResponse> = {
  data: {
    title: 'title',
    author: 'author',
    pubDate: 'pubDate',
    description: 'desc',
    isbn: 'isbn',
    cover: 'cover',
    categoryName: 'cate',
    publisher: 'pub',
  },
};

export const MOCK_BOOK_LIST_RESPONSE: APIResponse<BookSearchResponse[]> = {
  data: [
    {
      title: 'title',
      author: 'author',
      pubDate: 'pubDate',
      description: 'desc',
      isbn13: 'isbn',
      cover: 'cover',
      categoryName: 'cate',
      publisher: 'pub',
    },
    {
      title: 'title2',
      author: 'author2',
      pubDate: 'pubDate2',
      description: 'desc2',
      isbn13: 'isbn2',
      cover: 'cover2',
      categoryName: 'cate2',
      publisher: 'pub2',
    },
  ],
};

export const MOCK_NEW_STATUS_RESPONSE = {
  data: {
    status: 'NEW',
  },
};

export const MOCK_LIBRARY_RESPONSE_READING_STATUS: APIResponse<StatusBooksResponse[]> = {
  data: [
    {
      cover: 'cover',
      title: 'title',
      isbn: 'isbn',
      status: 'READING',
      readingLogId: 1,
    },
  ],
};

export const MOCK_COLLECTION_LIST_RESPONSE = {
  data: [
    {
      id: 5,
      name: 'name',
      covers: ['cover', 'cover2'],
    },
  ],
};

export const MOCK_COLLECTION_DETAIL_RESPONSE = {
  data: {
    id: 1,
    collectionName: 'test',
    books: [
      {
        title: 'title',
        cover: 'cover',
        isbn: 'isbn',
      },
    ],
  },
};

export const MOCK_READINGLOG_RESPONSE: APIResponse<ReadingLogResponse> = {
  data: {
    id: 1,
    title: 'title',
    author: 'author',
    cover: 'cover',
    publisher: 'publisher',
    summary: 'summary',
    note: 'note',
    rating: 5,
    startedAt: '2025-08-15',
    finishedAt: '2025-08-16',
  },
};
