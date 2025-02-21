import { collectionService } from "@/api/services/CollectionService.ts";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { IBookSaveRequest } from "@/api/services/BoookService.ts";

export const useGetListQuery = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["list"],
    queryFn: () => collectionService.getList(),
  });

  return { data, isLoading, error, refetch };
};

export const useGetOneQuery = (name: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["collection", name],
    queryFn: () => collectionService.getOne(name),
  });

  return { data, isLoading, error };
};

export const useCreateQuery = () => {
  return useMutation({
    mutationFn: (name: string) => collectionService.create(name),
  });
};

export const useAddBook = () => {
  return useMutation({
    mutationFn: ({ dto, name }: { dto: IBookSaveRequest; name: string }) =>
      collectionService.addBook(dto, name),
  });
};
