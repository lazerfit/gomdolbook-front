import { useKeycloak } from '@react-keycloak/web';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { BookService } from '@/api/services/BoookService';
import { BookSaveRequest, BookStatus, BookResponse } from '@/api/services/types';
import { createBookPayload } from '@/utils/saveBookUtils';

export const useUpdateStatus = () => {
  const { mutate } = useMutation({
    mutationFn: ({ isbn, status }: { isbn: string; status: string }) => BookService.updateStatus(isbn, status),
  });

  return { mutate };
};

const useGetBook = (isbn: string) => {
  const { keycloak, initialized } = useKeycloak();

  const { data, isLoading } = useQuery({
    queryKey: ['book', isbn],
    queryFn: () => BookService.getBook(isbn),
    enabled: initialized && keycloak.authenticated && !!isbn,
  });

  return { data: data?.data, isLoading };
};

const useGetBookSearchResult = (q: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['search', q],
    queryFn: () => BookService.getBookSearchResult(q),
    enabled: !!q,
  });

  return { data: data?.data, isLoading, refetch };
};

const useGetStatusBooks = (status: string) => {
  const { keycloak, initialized } = useKeycloak();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Library', status],
    queryFn: () => {
      return BookService.getLibrary(status);
    },
    enabled: initialized && keycloak.authenticated && !!status,
  });

  return { data: data?.data, isLoading, refetch };
};

const useGetStatus = (isbn: string) => {
  const { data, refetch } = useQuery({
    queryKey: ['status', isbn],
    queryFn: () => BookService.getStatus(isbn),
    enabled: !!isbn,
  });

  return { data: data?.data.status, refetch };
};

const useSaveBookMutate = () => {
  const { mutate } = useMutation({
    mutationFn: (data: BookSaveRequest) => BookService.saveBook(data),
  });

  return { mutate };
};

const useFinishedBookCalendarData = () => {
  const { keycloak, initialized } = useKeycloak();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['finishedBookCalendarData'],
    queryFn: () => BookService.getFinishedBookCalendarData(),
    enabled: initialized && keycloak.authenticated,
  });

  return { data: data?.data, isLoading, refetch };
};

export const useSaveOrUpdateStatusBook = (isbn: string, book: BookResponse, currentStatus: BookStatus) => {
  const queryClient = useQueryClient();

  const { mutate: updateStatus } = useUpdateStatus();
  const { mutate: saveBook } = useSaveBook();

  const handleSaveBookToLibrary = (status: BookStatus) => {
    if (!currentStatus || !book) {
      console.log('아직 책 정보를 불러오지 못했습니다.');
      return;
    }

    const mutationOptions = {
      onSuccess: () => {
        queryClient
          .invalidateQueries({ queryKey: ['status', isbn] })
          .catch(e => console.error('Error refetching status:', e));
        queryClient.invalidateQueries({ queryKey: ['Library', status.valueOf()] }).catch(e => console.error(e));
      },
      onError: (e: Error) => {
        console.error(e);
      },
    };

    if (currentStatus === BookStatus.NEW || currentStatus === BookStatus.EMPTY) {
      const payload = createBookPayload(status, book);
      saveBook(payload, mutationOptions);
    } else {
      updateStatus(
        {
          isbn: isbn,
          status: status,
        },
        mutationOptions,
      );
    }
  };

  return { handleSaveBookToLibrary };
};

export const useCalendar = useFinishedBookCalendarData;
export const useSaveBook = useSaveBookMutate;
export const useBook = useGetBook;
export const useBooks = useGetBookSearchResult;
export const useStatusBooks = useGetStatusBooks;
export const useStatus = useGetStatus;
