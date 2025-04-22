import { collectionService } from "@/api/services/CollectionService.ts";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BookSaveRequest } from "@/api/services/types/booktypes.ts";

const useGetList = () => {
  const {
    data,
    isLoading: isFetchingCollectionList,
    refetch: refetchCollectionList,
  } = useQuery({
    queryKey: ["list"],
    queryFn: () => collectionService.getList(),
  });

  const fetchedCollectionList = data?.data ?? [];

  return { fetchedCollectionList, isFetchingCollectionList, refetchCollectionList };
};

const useGetOne = (name: string) => {
  const {
    data,
    isLoading: isFetchingCollection,
    refetch: refetchCollection,
  } = useQuery({
    queryKey: ["collection", name],
    queryFn: () => collectionService.getOne(name),
    enabled: !!name,
  });

  const fetchedCollection = data?.data ?? [
    {
      cover: "default",
      title: "default",
      isbn: "default",
      status: "default",
    },
  ];

  return { fetchedCollection, isFetchingCollection, refetchCollection };
};

const useCreate = () => {
  const { mutate: mutateCreateCollection } = useMutation({
    mutationFn: (name: string) => collectionService.create(name),
  });

  return { mutateCreateCollection };
};

const useDelete = (name: string) => {
  const { mutate: mutateDeleteCollection, isPending: isDeletingCollection } = useMutation(
    {
      mutationFn: () => collectionService.delete(name),
    },
  );

  return { mutateDeleteCollection, isDeletingCollection };
};

const useAddBook = () => {
  const { mutate: mutateAddBookToCollection } = useMutation({
    mutationKey: ["addBookToCollection"],
    mutationFn: ({ dto, name }: { dto: BookSaveRequest; name: string }) =>
      collectionService.addBook(dto, name),
  });

  return { mutateAddBookToCollection };
};

const useRemoveBook = () => {
  const {
    mutate: mutateRemoveBookFromCollection,
    isPending: isRemovingBookFromCollection,
  } = useMutation({
    mutationKey: ["removeBookFromCollection"],
    mutationFn: ({ isbn, name }: { isbn: string; name: string }) =>
      collectionService.removeBook(isbn, name),
  });

  return { mutateRemoveBookFromCollection, isRemovingBookFromCollection };
};

interface Args {
  name?: string;
}

export const useCollection = ({ name = "" }: Args = {}) => {
  const { fetchedCollectionList, isFetchingCollectionList, refetchCollectionList } =
    useGetList();
  const { fetchedCollection, isFetchingCollection, refetchCollection } = useGetOne(name);
  const { mutateCreateCollection } = useCreate();
  const { mutateAddBookToCollection } = useAddBook();
  const { mutateRemoveBookFromCollection, isRemovingBookFromCollection } =
    useRemoveBook();
  const { mutateDeleteCollection, isDeletingCollection } = useDelete(name);

  return {
    fetchedCollectionList,
    isFetchingCollectionList,
    refetchCollectionList,
    fetchedCollection,
    isFetchingCollection,
    refetchCollection,
    mutateCreateCollection,
    mutateDeleteCollection,
    mutateAddBookToCollection,
    mutateRemoveBookFromCollection,
    isRemovingBookFromCollection,
    isDeletingCollection,
  };
};
