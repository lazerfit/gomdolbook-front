export enum BookStatus {
  READING = 'READING',
  TO_READ = 'TO_READ',
  FINISHED = 'FINISHED',
  NEW = 'NEW',
  EMPTY = 'EMPTY',
}

interface BaseBook {
  title: string;
  author: string;
  pubDate: string;
  description: string;
  cover: string;
  categoryName?: string;
  publisher: string;
}

export interface BookResponse extends BaseBook {
  isbn: string;
}

export interface BookSearchResponse extends BaseBook {
  isbn13: string;
}

export interface BookSaveRequest extends BookResponse {
  status?: BookStatus | null;
}

export interface FinishedBookData {
  title: string;
  isbn: string;
  cover: string;
  rating: number;
  finishedAt: string | null;
}

export interface CalendarEvent {
  title: string;
  start: string;
  coverUrl: string;
}

export interface StatusBooksResponse {
  cover: string;
  title: string;
  isbn: string;
  status: string;
  readingLogId: number;
}

export interface CollectionDetailResponse {
  id: number;
  collectionName: string;
  books: BookInfoInCollection[];
}

export interface BookInfoInCollection {
  title: string;
  cover: string;
  isbn: string;
}

export interface CollectionBookMetaResponse {
  id: number;
  cover: string;
  title: string;
  isbn: string;
}

export interface ReadingLogResponse {
  id: number;
  title: string;
  author: string;
  cover: string;
  publisher: string;
  summary: string;
  note: string;
  rating: number;
  startedAt: string;
  finishedAt: string;
}

export interface ReadingLogUpdateRequest {
  isbn: string;
  note: string;
  text: string;
}

export interface StatusResponse {
  status: BookStatus;
}
