export enum BookStatus {
  READING = "READING",
  TO_READ = "TO_READ",
  FINISHED = "FINISHED",
  NEW = "NEW",
  EMPTY = "EMPTY",
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

export interface LibraryResponse {
  cover: string;
  title: string;
  isbn: string;
  status: string;
}

export interface ReadingLogResponse {
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

export interface ReadingLogUpdateRequest {
  isbn: string;
  note: string;
  text: string;
}

export interface StatusResponse {
  status: string;
}
