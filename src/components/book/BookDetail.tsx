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
  const { book, isBookLoading } = useBook({ isbn: isbn });
  const { removeBook, isRemoveBookPending } = useCollection();
  const { status, statusRefetch, makeUpdatable } = useReadingLog({
    statusIsbn: isbn,
  });
  const { name } = useContext(CollectionParamContext);
  const { refetch: collectionBookListRefetch } = useContext(RefetchContext);

  const handleRemoveBook = () => {
    removeBook(
      { isbn: book.isbn13, name: name },
      {
        onSuccess: () => {
          Promise.all([
            collectionBookListRefetch().catch((error) =>
              console.log("list refetch error:", error),
            ),
            statusRefetch().catch((error) => console.log("status refetch error:", error)),
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
        {status !== "EMPTY" && status !== "NEW" && (
          <ThreeDotMenu onRemove={handleRemoveBook} isLoading={isRemoveBookPending}>
            <DropdownLink variants={itemVariants} onClick={makeUpdatable}>
              상태변경
            </DropdownLink>
          </ThreeDotMenu>
        )}
      </S.NavMenu>
      <S.BookContentWrapper>
        {isBookLoading ? (
          <BookDetailSkeletonLoader />
        ) : (
          <>
            <S.BookCover src={book.cover} />
            <S.BookInformation>
              <S.BookTitle>{book.title}</S.BookTitle>
              <BookPublisher
                author={book.author}
                publisher={book.publisher}
                date={book.pubDate}
                align="flex-start"
              />
              <S.BookSubInformation>
                <div style={{ fontWeight: "bold" }}>기본정보</div>
                <div>ISBN : {book.isbn13}</div>
                <div>카테고리 : {book.categoryName}</div>
              </S.BookSubInformation>
            </S.BookInformation>
            <S.BookDescription>
              <div style={{ fontWeight: "bold" }}>책 소개</div>
              <div>{book.description}</div>
            </S.BookDescription>
            <S.ButtonWrapper>
              <BookStatusButton
                bookData={book}
                statusRefetch={statusRefetch}
                status={status}
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
