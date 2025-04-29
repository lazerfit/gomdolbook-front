import { useMutation, useQuery } from "@tanstack/react-query";
import { BookService } from "@/api/services/BoookService.ts";
import { BookSaveRequest, BookStatus } from "@/api/services/types/booktypes.ts";

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
  const { data, isLoading: isFetchingBook } = useQuery({
    queryKey: ["book", isbn],
    queryFn: () => BookService.getBook(isbn),
    enabled: !!isbn,
  });

  const fetchedBook = data?.data ?? DEFAULT_BOOK;

  return { fetchedBook, isFetchingBook };
};

const useGetBookSearchResult = (q: string) => {
  const { data, isLoading: isFetchingSearchResults } = useQuery({
    queryKey: ["search", q],
    queryFn: () => BookService.getBookSearchResult(q),
    enabled: !!q,
  });

  const bookSearchResults = data?.data ?? [];

  return { bookSearchResults, isFetchingSearchResults };
};

const useGetLibrary = (status: string) => {
  const {
    data,
    isLoading: isFetchingLibraryBooks,
    refetch: refetchLibraryBooks,
  } = useQuery({
    queryKey: ["Library", status],
    queryFn: () => {
      return BookService.getLibrary(status);
    },
    enabled: !!status,
  });

  const libraryBooks = data?.data ?? [];

  return { libraryBooks, isFetchingLibraryBooks, refetchLibraryBooks };
};

const useSaveBook = () => {
  const { mutate: saveBookMutation } = useMutation({
    mutationFn: (data: BookSaveRequest) => BookService.saveBook(data),
  });

  return { saveBookMutation };
};

const useFinishedBookCalendarData = () => {
  const { data, isLoading: isFetchingFinishedBookCalendarData } = useQuery({
    queryKey: ["finishedBookCalendarData"],
    queryFn: () => BookService.getFinishedBookCalendarData(),
  });

  const finishedBookCalendarData = data?.data ?? [];

  return { finishedBookCalendarData, isFetchingFinishedBookCalendarData };
};

interface Args {
  isbn?: string;
  q?: string;
  status?: string;
}

export const useBook = ({ isbn = "", q = "", status = "" }: Args = {}) => {
  const { fetchedBook, isFetchingBook } = useGetBook(isbn);
  const { bookSearchResults, isFetchingSearchResults } = useGetBookSearchResult(q);
  const { libraryBooks, isFetchingLibraryBooks, refetchLibraryBooks } =
    useGetLibrary(status);
  const { saveBookMutation } = useSaveBook();
  const { finishedBookCalendarData, isFetchingFinishedBookCalendarData } =
    useFinishedBookCalendarData();

  return {
    fetchedBook,
    isFetchingBook,
    bookSearchResults,
    isFetchingSearchResults,
    libraryBooks,
    isFetchingLibraryBooks,
    refetchLibraryBooks,
    saveBookMutation,
    finishedBookCalendarData,
    isFetchingFinishedBookCalendarData,
  };
};
