import { LibraryResponse } from "@/api/services/types/booktypes.ts";

export const MOCK_BOOK_RESPONSE = {
  data: {
    title: "title",
    author: "author",
    pubDate: "pubDate",
    description: "desc",
    isbn13: "isbn",
    cover: "cover",
    categoryName: "cate",
    publisher: "pub",
  },
};

export const MOCK_BOOK_LIST_RESPONSE = {
  data: [
    {
      title: "title",
      author: "author",
      pubDate: "pubDate",
      description: "desc",
      isbn: "isbn",
      cover: "cover",
      categoryName: "cate",
      publisher: "pub",
    },
    {
      title: "title2",
      author: "author2",
      pubDate: "pubDate2",
      description: "desc2",
      isbn: "isbn2",
      cover: "cover2",
      categoryName: "cate2",
      publisher: "pub2",
    },
  ],
};

export const MOCK_NEW_STATUS_RESPONSE = {
  data: {
    status: "NEW",
  },
};

export const MOCK_READING_STATUS_RESPONSE = {
  data: {
    status: "READING",
  },
};

export const MOCK_LIBRARY_RESPONSE_READING_STATUS = [
  {
    cover: "cover",
    title: "title",
    isbn: "isbn",
    status: "READING",
  },
];

export const MOCK_LIBRARY_RESPONSE_NEW_STATUS = [
  {
    cover: "cover",
    title: "title",
    isbn: "isbn",
    status: "NEW",
  },
];

export const MOCK_LIBRARY_EMPTY_RESPONSE: LibraryResponse[] = [];

export const MOCK_COLLECTION_LIST_RESPONSE = {
  data: [
    {
      name: "name",
      books: {
        covers: ["cover"],
      },
    },
  ],
};

export const MOCK_COLLECTION_DETAIL_RESPONSE = {
  data: [
    {
      cover: "cover",
      title: "test",
      isbn: "isbn",
      status: "READING",
    },
  ],
};

export const MOCK_READINGLOG_RESPONSE = {
  data: {
    title: "title",
    author: "author",
    pubDate: "pub",
    cover: "cover",
    publisher: "publisher",
    status: "status",
    note1: "note1",
    note2: "note2",
    note3: "note3",
    rating: "5",
  },
};
