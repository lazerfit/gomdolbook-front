import { BookService, IReadingLogUpdateRequest } from "@/api/services/BoookService.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { IReadinglogResponse } from "@/api/services/BoookService.ts";

const DEFAULT_READING_LOG: IReadinglogResponse = {
  title: "default",
  author: "default",
  pubDate: "default",
  cover: "default",
  publisher: "default",
  status: "default",
  note1: "default note1",
  note2: "default note2",
  note3: "default note3",
  rating: 0,
};

const useUpdateReadingLog = () => {
  const { mutate: updateReadingLog } = useMutation({
    mutationFn: (data: IReadingLogUpdateRequest) => BookService.updateReadingLog(data),
  });

  return { updateReadingLog };
};

const useGetStatus = (isbn: string) => {
  const [status, setStatus] = useState("EMPTY");
  const makeUpdatable = () => {
    setStatus("NEW");
  };
  const { data, refetch: statusRefetch } = useQuery({
    queryKey: ["status", isbn],
    queryFn: () => BookService.getStatus(isbn),
    enabled: !!isbn,
  });

  useEffect(() => {
    const response = data?.data;
    if (response) {
      setStatus(response.status);
    }
  }, [data]);

  return { status, statusRefetch, makeUpdatable };
};

const useUpdateStatus = () => {
  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ isbn, status }: { isbn: string; status: string }) =>
      BookService.updateStatus(isbn, status),
  });

  return { updateStatus };
};

const useGetReadinglog = (isbn: string) => {
  const {
    data,
    refetch: readingLogRefetch,
    isLoading: isReadingLogLoading,
  } = useQuery({
    queryKey: ["readingLog", isbn],
    queryFn: () => BookService.getReadingLog(isbn),
    enabled: !!isbn,
  });

  const readingLog = data?.data ?? DEFAULT_READING_LOG;

  return { readingLog, readingLogRefetch, isReadingLogLoading };
};

const useUpdateRating = () => {
  const { mutate: updateRating } = useMutation({
    mutationFn: ({ isbn, star }: { isbn: string; star: number }) =>
      BookService.updateRating(isbn, star),
  });

  return { updateRating };
};

interface Args {
  statusIsbn?: string;
  readingLogIsbn?: string;
  statusValue?: string;
}

export const useReadingLog = ({ statusIsbn = "", readingLogIsbn = "" }: Args = {}) => {
  const { readingLog, readingLogRefetch, isReadingLogLoading } =
    useGetReadinglog(readingLogIsbn);
  const { status, statusRefetch, makeUpdatable } = useGetStatus(statusIsbn);
  const { updateReadingLog } = useUpdateReadingLog();
  const { updateStatus } = useUpdateStatus();
  const { updateRating } = useUpdateRating();
  return {
    readingLog,
    readingLogRefetch,
    isReadingLogLoading,
    status,
    statusRefetch,
    makeUpdatable,
    updateReadingLog,
    updateStatus,
    updateRating,
  };
};
