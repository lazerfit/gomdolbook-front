import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {
  BookDetailSkeletonLoader,
  Toast,
  BookPublisher,
  ThreeDotMenu,
} from "@/ui/index.ts";
import BookStatusButton from "@/components/book/BookStatusButton.tsx";
import {
  RefetchContext,
  CollectionParamContext,
} from "@/api/contextProviders/contexts/index.ts";
import { useBook, useCollection, useReadingLog } from "@/hooks/index.ts";
import { DropdownLink } from "@/ui/ThreeDotMenu.tsx";
import { itemVariants } from "@/ui/frameMotion/variants.ts";
import * as S from "./BookDetail.styles.ts";
import { useToast } from "@/hooks/useToast.ts";

interface Props {
  isbn: string;
  onClose: () => void;
}

const BookDetail = ({ isbn = "", onClose }: Props) => {
  const { hasToastError, openErrorToast, openToast, isToastVisible, closeToast } =
    useToast();
  const { fetchedBook, isFetchingBook } = useBook({ isbn: isbn });
  const { mutateRemoveBookFromCollection, isRemovingBookFromCollection } =
    useCollection();
  const { fetchedStatus, refetchStatus, enableStatusUpdate } = useReadingLog({
    statusIsbn: isbn,
  });
  const { name } = useContext(CollectionParamContext);
  const { refetch: collectionBookListRefetch } = useContext(RefetchContext);

  const handleRemoveBook = () => {
    mutateRemoveBookFromCollection(
      { isbn: fetchedBook.isbn, name: name },
      {
        onSuccess: () => {
          Promise.all([
            collectionBookListRefetch().catch((error) =>
              console.log("list refetch error:", error),
            ),
            refetchStatus().catch((error) => console.log("status refetch error:", error)),
          ])
            .then(() => onClose())
            .catch((error) => console.log(error));
        },
        onError: (error) => console.log("removeBook error", error),
      },
    );
  };

  return (
    <S.BookDetailWrapper>
      <S.NavMenu>
        <S.BackButton data-testid="backBtn" onClick={onClose}>
          <FaArrowLeft style={{ fontSize: "20px" }} />
        </S.BackButton>
        <S.ThreeDotMenuWrapper>
          {fetchedStatus !== "EMPTY" && fetchedStatus !== "NEW" && (
            <ThreeDotMenu
              onRemove={handleRemoveBook}
              isLoading={isRemovingBookFromCollection}
            >
              <DropdownLink variants={itemVariants} onClick={enableStatusUpdate}>
                상태변경
              </DropdownLink>
            </ThreeDotMenu>
          )}
        </S.ThreeDotMenuWrapper>
      </S.NavMenu>
      <S.BookContentWrapper>
        {isFetchingBook ? (
          <BookDetailSkeletonLoader />
        ) : (
          <>
            <S.BookCover src={fetchedBook.cover} />
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
              <BookStatusButton
                bookData={fetchedBook}
                statusRefetch={refetchStatus}
                status={fetchedStatus}
                showToast={openToast}
                showErrorToast={openErrorToast}
              />
            </S.ButtonWrapper>
          </>
        )}
      </S.BookContentWrapper>
      <Toast
        onShow={isToastVisible}
        onError={hasToastError}
        onClose={closeToast}
        message={{
          success: "내 서재에 성공적으로 저장하였어요.",
          error: "다시 시도해주세요.",
        }}
      />
    </S.BookDetailWrapper>
  );
};

export default BookDetail;
