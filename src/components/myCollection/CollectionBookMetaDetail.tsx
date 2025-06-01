import { useContext } from "react";
import * as S from "@/components/book/BookDetail.styles.ts";
import { FaArrowLeft } from "react-icons/fa6";
import { BookDetailSkeletonLoader, BookPublisher, Toast } from "@/ui/index.js";
import { useBook, useCollection, useToast } from "@/hooks/index.js";
import { CollectionParamContext } from "@/api/contextProviders/contexts/index.js";
import { Button } from "@/components/book/BookStatusButton.tsx";

interface Props {
  isbn: string;
  onClose: () => void;
}

const CollectionBookMetaDetail = ({ isbn = "", onClose }: Props) => {
  const { hasToastError, openErrorToast, openToast, isToastVisible, closeToast } =
    useToast();
  const { fetchedBook, isFetchingBook } = useBook({ isbn: isbn });
  const { name } = useContext(CollectionParamContext);
  const {
    mutateRemoveBookFromCollection,
    mutateAddBookToCollection,
    refetchCollectionList,
    refetchCollection,
    isExistBookInCollection,
    refetchIsExistBookInCollection,
  } = useCollection({
    name,
    isbn,
  });

  const handleRemoveBookFromCollection = () => {
    mutateRemoveBookFromCollection(
      { isbn: fetchedBook.isbn, name },
      {
        onSuccess: () => {
          Promise.all([
            refetchCollectionList().catch((error) => {
              console.log("list refetch error:", error);
            }),
            refetchIsExistBookInCollection().catch((error) => {
              console.log("isExistBookInCollection refetch error:", error);
            }),
            refetchCollection().catch((error) => {
              console.log("collection refetch error:", error);
            }),
          ])
            .then(() => onClose())
            .catch((error) => {
              console.log(error);
            });
        },
        onError: (error) => {
          console.log("removeBook error", error);
          openErrorToast();
        },
      },
    );
  };

  const handleAddBookToCollection = () => {
    mutateAddBookToCollection(
      {
        dto: fetchedBook,
        name,
      },
      {
        onSuccess: () => {
          Promise.all([
            refetchCollectionList().catch((error) => {
              console.log("list refetch error:", error);
            }),
            refetchIsExistBookInCollection().catch((error) => {
              console.log("isExistBookInCollection refetch error:", error);
            }),
            refetchCollection().catch((error) => {
              console.log("collection refetch error:", error);
            }),
          ])
            .then(() => openToast())
            .catch((error) => {
              console.log(error);
            });
        },
        onError: (error) => {
          console.log("addBook error", error);
          openErrorToast();
        },
      },
    );
  };

  return (
    <S.BookDetailWrapper>
      <S.NavMenu>
        <S.BackButton data-testid="backBtn" onClick={onClose}>
          <FaArrowLeft style={{ fontSize: "20px" }} />
        </S.BackButton>
      </S.NavMenu>
      <S.BookContentWrapper>
        {isFetchingBook ? (
          <BookDetailSkeletonLoader />
        ) : (
          <>
            <S.BookCover src={fetchedBook.cover} alt="책표지" />
            <S.BookInformation>
              <S.BookTitle>{fetchedBook.title}</S.BookTitle>
              <BookPublisher
                author={fetchedBook.author}
                publisher={fetchedBook.publisher}
                date={fetchedBook.pubDate}
                align="flex-start"
              />
              <S.BookSubInformation>
                <div style={{ fontWeight: "bold" }}>기본정보</div>
                <div>ISBN : {fetchedBook.isbn}</div>
                <div>카테고리 : {fetchedBook.categoryName}</div>
              </S.BookSubInformation>
            </S.BookInformation>
            <S.BookDescription>
              <div style={{ fontWeight: "bold" }}>책 소개</div>
              <div>{fetchedBook.description}</div>
            </S.BookDescription>
            <S.ButtonWrapper>
              {isExistBookInCollection ? (
                <Button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={handleRemoveBookFromCollection}
                >
                  제거하기
                </Button>
              ) : (
                <Button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={handleAddBookToCollection}
                >
                  추가하기
                </Button>
              )}
            </S.ButtonWrapper>
          </>
        )}
      </S.BookContentWrapper>
      <Toast
        onShow={isToastVisible}
        onError={hasToastError}
        onClose={closeToast}
        message={{
          success: "🎉 내 컬렉션에 저장되었습니다.",
          error: "❌ 다시 시도해주세요.",
        }}
      />
    </S.BookDetailWrapper>
  );
};

export default CollectionBookMetaDetail;
