import { styled } from "styled-components";
import { BookStatus } from "@/api/services/BoookService.ts";
import translateBookStatus from "@/utils/TranslateBookStatus.ts";
import type { IBookResponse } from "@/api/services/BoookService.ts";
import { useContext } from "react";
import {
  RefetchContext,
  CollectionParamContext,
} from "@/api/contextProviders/contexts/index.ts";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useBook, useCollection } from "@/hooks/index.ts";
import { motion } from "framer-motion";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 17px;
  margin: 34px auto;
`;

const ReadingStatus = styled.div`
  border: 1px solid black;
  width: 110px;
  height: 40px;
  padding: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled(motion.button)`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: 1rem;
  font-weight: 500;
  line-height: 30px;
  padding: 7px ${(props) => props.theme.fonts.size500};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

  > p {
    position: relative;
    font-size: 1rem;
  }
`;

interface Props {
  bookData: IBookResponse;
  status: string;
  statusRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<unknown, Error>>;
  showToast: () => void;
  showErrorToast: () => void;
}

const BookDetailButtonActions = ({
  bookData,
  statusRefetch,
  showToast = () => void 0,
  showErrorToast = () => void 0,
  status = "NEW",
}: Props) => {
  const { saveBook } = useBook();
  const { addBook } = useCollection();
  const { isCollection, name } = useContext(CollectionParamContext);
  const { refetch: collectionBookListRefetch } = useContext(RefetchContext);

  const getReadingLogSaveRequest = (status?: BookStatus) => {
    return {
      title: bookData.title,
      author: bookData.author,
      pubDate: bookData.pubDate,
      description: bookData.description,
      isbn13: bookData.isbn13,
      cover: bookData.cover,
      categoryName: bookData.categoryName,
      publisher: bookData.publisher,
      status: status ?? null,
    };
  };

  const saveBtnArgs = [
    { status: BookStatus.READING, label: <p>읽는 중</p> },
    { status: BookStatus.TO_READ, label: <p>읽을 예정</p> },
    { status: BookStatus.FINISHED, label: <p>읽기 완료</p> },
  ];

  const saveReadingLog = (status: BookStatus) => {
    const saveRequest = getReadingLogSaveRequest(status);
    saveBook(saveRequest, {
      onSuccess: () => {
        statusRefetch()
          .then(() => showToast())
          .catch((error) => console.log(error));
      },
      onError: (error) => {
        showErrorToast();
        console.log(error);
      },
    });
  };

  const onAddBook = () => {
    addBook(
      { dto: getReadingLogSaveRequest(), name: encodeURIComponent(name) },
      {
        onSuccess: () => {
          Promise.all([
            collectionBookListRefetch().catch((error) =>
              console.log("list refetch error:", error),
            ),
            statusRefetch().catch((error) => console.log("status refetch error:", error)),
          ]).catch((error) => console.log(error));
        },
        onError: (error) => console.log("addBook Error", error),
      },
    );
  };

  return (
    <ButtonWrapper>
      {isCollection && status === "EMPTY" && (
        <Button
          data-testid="collectionBtn"
          onClick={onAddBook}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <p>추가하기</p>
        </Button>
      )}
      {status !== "NEW" && status !== "EMPTY" ? (
        <ReadingStatus data-testid="readingStatus">
          {translateBookStatus(status)}
        </ReadingStatus>
      ) : (
        saveBtnArgs.map((arg) => (
          <Button
            onClick={() => saveReadingLog(arg.status)}
            key={arg.status}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {arg.label}
          </Button>
        ))
      )}
    </ButtonWrapper>
  );
};

export default BookDetailButtonActions;
