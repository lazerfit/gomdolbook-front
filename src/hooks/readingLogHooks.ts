import { useMutation, useQuery } from '@tanstack/react-query';
import { ReadingLogService } from '@/api/services/ReadingLogService';
import { useKeycloak } from '@react-keycloak/web';

export const useReadinglog = (id: number) => {
  const { initialized, keycloak } = useKeycloak();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['readingLog', id],
    queryFn: () => ReadingLogService.getReadingLog(id),
    enabled: initialized && keycloak.authenticated && !!id,
  });

  return { data: data?.data, refetch, isLoading };
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
