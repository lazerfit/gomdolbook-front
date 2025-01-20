import { useQuery } from "@tanstack/react-query";
import { BookService } from "@/api/services/BoookService";

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
