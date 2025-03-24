import { collectionService } from "@/api/services/CollectionService.ts";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { IBookSaveRequest } from "@/api/services/BoookService.ts";

const useGetList = () => {
  const {
    data,
    isLoading: isCollectionListLoading,
    refetch: collectionListRefetch,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () => collectionService.getList(),
  });

  const collectionList = data?.data ?? [];

  return { collectionList, isCollectionListLoading, collectionListRefetch };
};

const useGetOne = (name: string) => {
  const {
    data,
    isLoading: isCollectionLoading,
    refetch: collectionRefetch,
  } = useQuery({
    queryKey: ["collection", name],
    queryFn: () => collectionService.getOne(name),
    enabled: !!name,
  });

  const collection = data?.data ?? [
    {
      cover: "default",
      title: "default",
      isbn: "default",
      status: "default",
    },
  ];

  return { collection, isCollectionLoading, collectionRefetch };
};

const useCreate = () => {
  const { mutate: createCollection } = useMutation({
    mutationFn: (name: string) => collectionService.create(name),
  });

  return { createCollection };
};

const useDelete = (name: string) => {
  const { mutate: deleteCollection, isPending: isDeleteCollectionPending } = useMutation({
    mutationFn: () => collectionService.delete(name),
  });

  return { deleteCollection, isDeleteCollectionPending };
};

const useAddBook = () => {
  const { mutate: addBook } = useMutation({
    mutationKey: ["addBookToCollection"],
    mutationFn: ({ dto, name }: { dto: IBookSaveRequest; name: string }) =>
      collectionService.addBook(dto, name),
  });

  return { addBook };
};

const useRemoveBook = () => {
  const { mutate: removeBook, isPending: isRemoveBookPending } = useMutation({
    mutationKey: ["removeBookFromCollection"],
    mutationFn: ({ isbn, name }: { isbn: string; name: string }) =>
      collectionService.removeBook(isbn, name),
  });

  return { removeBook, isRemoveBookPending };
};

interface Args {
  name?: string;
}

export const useCollection = ({ name = "" }: Args = {}) => {
  const { collectionList, isCollectionListLoading, collectionListRefetch } = useGetList();
  const { collection, isCollectionLoading, collectionRefetch } = useGetOne(name);
  const { createCollection } = useCreate();
  const { addBook } = useAddBook();
  const { removeBook, isRemoveBookPending } = useRemoveBook();
  const { deleteCollection, isDeleteCollectionPending } = useDelete(name);

  return {
    collectionList,
    isCollectionListLoading,
    collectionListRefetch,
    collection,
    isCollectionLoading,
    collectionRefetch,
    createCollection,
    deleteCollection,
    addBook,
    removeBook,
    isRemoveBookPending,
    isDeleteCollectionPending,
  };
};
