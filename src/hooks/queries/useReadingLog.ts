import { BookService, IReadingLogUpdateRequest } from "@/api/services/BoookService.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateReadingLog = () => {
  return useMutation({
    mutationFn: (data: IReadingLogUpdateRequest) => BookService.updateReadingLog(data),
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
