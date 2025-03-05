import { useMutation, useQuery } from "@tanstack/react-query";
import { BookService, IBookSaveRequest } from "@/api/services/BoookService.ts";

export const useGetBookQuery = (isbn: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book", isbn],
    queryFn: () => BookService.getBook(isbn),
  });

  return { data, isLoading, isError, error };
};

export const useGetBookSearchResult = (q: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["search", q],
    queryFn: () => BookService.getBookSearchResult(q),
  });

  return { data, isError, error, isLoading };
};

export const useGetLibrary = (status: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["Library", status],
    queryFn: () => BookService.getLibrary(status),
  });

  return { data, error, isLoading };
};

export const useSaveBook = () => {
  return useMutation({
    mutationFn: (data: IBookSaveRequest) => BookService.saveBook(data),
  });
};
