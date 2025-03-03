import { BookService, IBookSaveRequest } from "@/api/services/BoookService.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSaveReadingLogQuery = () => {
  return useMutation({
    mutationFn: (data: IBookSaveRequest) => BookService.saveReadingLog(data),
  });
};

export const useGetStatus = (isbn: string) => {
  return useQuery({
    queryKey: ["status", isbn],
    queryFn: () => BookService.getStatus(isbn),
  });
};

export const useGetReadinglog = (isbn: string) => {
  return useQuery({
    queryKey: ["readingLog", isbn],
    queryFn: () => BookService.getReadingLog(isbn),
  });
};
