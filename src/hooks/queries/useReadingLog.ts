import { BookService, IReadingLogUpdateRequest } from "@/api/services/BoookService.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const DEFAULT_READING_LOG = {
  title: "default",
  author: "default",
  pubDate: "default",
  cover: "default",
  publisher: "default",
  status: "default",
  note1: "default note1",
  note2: "default note2",
  note3: "default note3",
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
  });

  useEffect(() => {
    if (data?.data) {
      setStatus(data?.data);
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
  });

  const readingLog = data?.data ?? DEFAULT_READING_LOG;

  return { readingLog, readingLogRefetch, isReadingLogLoading };
};

interface Args {
  isbn?: string;
  statusValue?: string;
}

export const useReadingLog = ({ isbn = "" }: Args = {}) => {
  const { readingLog, readingLogRefetch, isReadingLogLoading } = useGetReadinglog(isbn);
  const { status, statusRefetch, makeUpdatable } = useGetStatus(isbn);
  const { updateReadingLog } = useUpdateReadingLog();
  const { updateStatus } = useUpdateStatus();
  return {
    readingLog,
    readingLogRefetch,
    isReadingLogLoading,
    status,
    statusRefetch,
    makeUpdatable,
    updateReadingLog,
    updateStatus,
  };
};
