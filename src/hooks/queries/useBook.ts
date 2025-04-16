import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BookService,
  IBookSaveRequest,
  BookStatus,
} from "@/api/services/BoookService.ts";

const DEFAULT_BOOK = {
  title: "default title",
  author: "default author",
  pubDate: "default pubDate",
  description: "default description",
  isbn: "default isbn",
  cover: "default cover",
  categoryName: "default categoryName",
  publisher: "default publisher",
  status: BookStatus.TO_READ,
};

const useGetBook = (isbn: string) => {
  const { data, isLoading: isBookLoading } = useQuery({
    queryKey: ["book", isbn],
    queryFn: () => BookService.getBook(isbn),
    enabled: !!isbn,
  });

  const book = data?.data ?? DEFAULT_BOOK;

  return { book, isBookLoading };
};

const useGetBookSearchResult = (q: string) => {
  const { data, isLoading: isSearchResultLoading } = useQuery({
    queryKey: ["search", q],
    queryFn: () => BookService.getBookSearchResult(q),
    enabled: !!q,
  });

  const searchResult = data?.data ?? [];

  return { searchResult, isSearchResultLoading };
};

const useGetLibrary = (status: string) => {
  const { data, isLoading: isLibraryBookListLoading } = useQuery({
    queryKey: ["Library", status],
    queryFn: () => {
      return BookService.getLibrary(status);
    },
    enabled: !!status,
  });

  const libraryBookList = data?.data ?? [];

  return { libraryBookList, isLibraryBookListLoading };
};

const useSaveBook = () => {
  const { mutate: saveBook } = useMutation({
    mutationFn: (data: IBookSaveRequest) => BookService.saveBook(data),
  });

  return { saveBook };
};

interface Args {
  isbn?: string;
  q?: string;
  status?: string;
}

export const useBook = ({ isbn = "", q = "", status = "" }: Args = {}) => {
  const { book, isBookLoading } = useGetBook(isbn);
  const { searchResult, isSearchResultLoading } = useGetBookSearchResult(q);
  const { libraryBookList, isLibraryBookListLoading } = useGetLibrary(status);
  const { saveBook } = useSaveBook();

  return {
    book,
    isBookLoading,
    searchResult,
    isSearchResultLoading,
    libraryBookList,
    isLibraryBookListLoading,
    saveBook,
  };
};
