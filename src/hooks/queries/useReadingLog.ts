import { BookService } from "@/api/services/BoookService.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  ReadingLogResponse,
  ReadingLogUpdateRequest,
} from "@/api/services/types/booktypes.ts";

const DEFAULT_READING_LOG: ReadingLogResponse = {
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
  const { mutate: updateReadingLogMutation } = useMutation({
    mutationFn: (data: ReadingLogUpdateRequest) => BookService.updateReadingLog(data),
  });

  return { updateReadingLogMutation };
};

const useGetStatus = (isbn: string) => {
  const [fetchedStatus, setFetchedStatus] = useState("EMPTY");
  const enableStatusUpdate = () => {
    setFetchedStatus("NEW");
  };
  const { data, refetch: refetchStatus } = useQuery({
    queryKey: ["status", isbn],
    queryFn: () => BookService.getStatus(isbn),
    enabled: !!isbn,
  });

  useEffect(() => {
    const response = data?.data;
    if (response) {
      setFetchedStatus(response.status);
    }
  }, [data]);

  return { fetchedStatus, refetchStatus, enableStatusUpdate };
};

const useUpdateStatus = () => {
  const { mutate: updateStatusMutation } = useMutation({
    mutationFn: ({ isbn, status }: { isbn: string; status: string }) =>
      BookService.updateStatus(isbn, status),
  });

  return { updateStatusMutation };
};

const useGetReadinglog = (isbn: string) => {
  const {
    data,
    refetch: refetchReadingLog,
    isLoading: isFetchingReadingLog,
  } = useQuery({
    queryKey: ["readingLog", isbn],
    queryFn: () => BookService.getReadingLog(isbn),
    enabled: !!isbn,
  });

  const fetchedReadingLog = data?.data ?? DEFAULT_READING_LOG;

  return { fetchedReadingLog, refetchReadingLog, isFetchingReadingLog };
};

const useUpdateRating = () => {
  const { mutate: updateRatingMutation } = useMutation({
    mutationFn: ({ isbn, star }: { isbn: string; star: number }) =>
      BookService.updateRating(isbn, star),
  });

  return { updateRatingMutation };
};

interface Args {
  statusIsbn?: string;
  readingLogIsbn?: string;
  statusValue?: string;
}

export const useReadingLog = ({ statusIsbn = "", readingLogIsbn = "" }: Args = {}) => {
  const { fetchedReadingLog, refetchReadingLog, isFetchingReadingLog } =
    useGetReadinglog(readingLogIsbn);
  const { fetchedStatus, refetchStatus, enableStatusUpdate } = useGetStatus(statusIsbn);
  const { updateReadingLogMutation } = useUpdateReadingLog();
  const { updateStatusMutation } = useUpdateStatus();
  const { updateRatingMutation } = useUpdateRating();
  return {
    fetchedReadingLog,
    refetchReadingLog,
    isFetchingReadingLog,
    fetchedStatus,
    refetchStatus,
    enableStatusUpdate,
    updateReadingLogMutation,
    updateStatusMutation,
    updateRatingMutation,
  };
};
