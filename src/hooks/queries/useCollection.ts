import { collectionService } from "@/api/services/CollectionService.ts";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useGetListQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["list"],
    queryFn: () => collectionService.getList(),
  });

  return { data, isLoading, error };
};

export const useGetOneQuery = (name: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["collection", name],
    queryFn: () => collectionService.getOne(name),
  });

  return { data, isLoading, error };
};

// export const useCreateQuery = (name: string) => {
//   const { isLoading, error } = useQuery({
//     queryKey: ["create", name],
//     queryFn: () => collectionService.create(name),
//   });

//   return { isLoading, error };
// };

export const useCreateQuery = () => {
  return useMutation({
    mutationFn: (name: string) => collectionService.create(name),
  });
};
