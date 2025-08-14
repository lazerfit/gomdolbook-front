import { useMutation, useQuery } from '@tanstack/react-query';
import { BookStatus, ReadingLogResponse } from '@/api/services/types';
import { ReadingLogService } from '@/api/services/ReadingLogService';
import { useKeycloak } from '@react-keycloak/web';

const DEFAULT_READING_LOG: ReadingLogResponse = {
  id: 0,
  title: 'default',
  author: 'default',
  cover: 'default',
  publisher: 'default',
  status: BookStatus.NEW,
  summary: 'default summary',
  note: 'default note',
  rating: 0,
  startedAt: '2025-01-01',
  finishedAt: '2025-01-01',
};

export const useReadinglog = (id: number) => {
  const { initialized, keycloak } = useKeycloak();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['readingLog', id],
    queryFn: async () => {
      const response = await ReadingLogService.getReadingLog(id);
      if (!response?.data) {
        throw new Error('No Data Received');
      }
      return response?.data;
    },
    enabled: initialized && keycloak.authenticated && !!id,
    placeholderData: DEFAULT_READING_LOG,
  });

  return { data, refetch, isLoading };
};

export const useUpdateRating = () => {
  const { mutate } = useMutation({
    mutationFn: ({ id, star }: { id: number; star: number }) => ReadingLogService.updateRating(id, star),
  });

  return { mutate };
};

export const useUpdateSummary = () => {
  const { mutate } = useMutation({
    mutationFn: ({ id, summary }: { id: number; summary: string }) => ReadingLogService.updateSummary(id, summary),
  });

  return { mutate };
};

export const useUpdateNote = () => {
  const { mutate } = useMutation({
    mutationFn: ({ id, note }: { id: number; note: string }) => ReadingLogService.updateNote(id, note),
  });

  return { mutate };
};
