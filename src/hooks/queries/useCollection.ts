import { collectionService } from "@/api/services/CollectionService.ts";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { IBookSaveRequest } from "@/api/services/BoookService.ts";

export const useGetListQuery = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["list"],
    queryFn: () => collectionService.getList(),
  });

  return { data, isLoading, isError, refetch };
};

export const useGetOneQuery = (name: string) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["collection", name],
    queryFn: () => collectionService.getOne(name),
  });

  return { data, isLoading, isError, refetch };
};

export const useCreateQuery = () => {
  return useMutation({
    mutationFn: (name: string) => collectionService.create(name),
  });
};

export const useAddBook = () => {
  return useMutation({
    mutationKey: ["addBookToCollection"],
    mutationFn: ({ dto, name }: { dto: IBookSaveRequest; name: string }) =>
      collectionService.addBook(dto, name),
  });
};

export const useRemoveBook = () => {
  return useMutation({
    mutationKey: ["removeBookFromCollection"],
    mutationFn: ({ isbn, name }: { isbn: string; name: string }) =>
      collectionService.removeBook(isbn, name),
  });
};
