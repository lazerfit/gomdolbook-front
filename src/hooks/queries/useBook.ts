import { useQuery } from "@tanstack/react-query";
import { BookService } from "@/api/services/BoookService";

export const useBookQuery = (isbn: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book", isbn],
    queryFn: () => BookService.getBook(isbn),
  });

  return { data, isLoading, isError, error };
};
