import { useKeycloak } from '@react-keycloak/web';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collectionService } from '@/api/services/CollectionService';
import { ApiResponse, BookResponse } from '@/api/services/types';
import { CustomError } from '@/api/services/config/request';
import { useCallback } from 'react';

const useGetCollectionList = () => {
  const { initialized, keycloak } = useKeycloak();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['collectionList'],
    queryFn: () => collectionService.getList(),
    enabled: initialized && keycloak.authenticated,
  });

  return { data: data?.data, isLoading, refetch };
};

const useGetSingleCollection = (id: number) => {
  const { initialized, keycloak } = useKeycloak();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['collection', id],
    queryFn: () => collectionService.getOne(id),
    enabled: initialized && keycloak.authenticated && !!id,
  });

  return { data: data?.data, isLoading, refetch };
};

const useCreateCollectionMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (name: string) => collectionService.create(name),
  });

  return { mutate };
};

const useDeleteCollectionMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id }: { id: number }) => collectionService.delete(id),
  });

  return { mutate, isPending };
};

const useAddBookMutation = () => {
  const { mutate } = useMutation<void | ApiResponse<void>, CustomError, { dto: BookResponse; id: number }, unknown>({
    mutationKey: ['addBookToCollection'],
    mutationFn: ({ dto, id }: { dto: BookResponse; id: number }) => collectionService.addBook(dto, id),
  });

  return { mutate };
};

const useRemoveBookMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['removeBookFromCollection'],
    mutationFn: ({ isbn, id }: { isbn: string; id: number }) => collectionService.removeBook(isbn, id),
  });

  return { mutate, isPending };
};

const useIsExistBookInCollection = (name: string, isbn: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['isExistBookInCollection', name, isbn],
    queryFn: () => collectionService.isExistBookInCollection(name, isbn),
    enabled: !!name && !!isbn,
  });

  return { data: data?.data, isLoading, refetch };
};

export const useInvalidateCollections = () => {
  const queryClient = useQueryClient();

  const invalidate = useCallback(
    (id: number) => {
      queryClient.invalidateQueries({ queryKey: ['collection', id] }).catch(e => console.error(e));
      queryClient
        .invalidateQueries({ queryKey: ['collectionList'] })
        .catch(e => console.log('컬렉션 목록 새로고침 실패:', e));
    },
    [queryClient],
  );

  return { invalidate };
};

export const useRenameCollection = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['renameCollection'],
    mutationFn: ({ id, name }: { id: number; name: string }) => collectionService.renameCollection(id, name),
  });
  return { mutate, isPending };
};

export const useCollections = useGetCollectionList;
export const useCollection = useGetSingleCollection;
export const useCreateCollection = useCreateCollectionMutation;
export const useDeleteCollection = useDeleteCollectionMutation;
export const useAddBookToCollection = useAddBookMutation;
export const useRemoveBookFromCollection = useRemoveBookMutation;
export const useIsBookExistInCollection = useIsExistBookInCollection;
