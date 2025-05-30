import { styled } from "styled-components";
import translateBookStatus from "@/utils/TranslateBookStatus.ts";
import { BookResponse, BookStatus } from "@/api/services/types/booktypes.ts";
import { useContext, useEffect, useState } from "react";
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

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin: 10px auto;
    flex-direction: column;
    width: 100%;
    display: block;
  }
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

export const Button = styled(motion.button)`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: 1rem;
  font-weight: 500;
  line-height: 30px;
  padding: 7px ${(props) => props.theme.fonts.size500};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 3px 0;

  > p {
    position: relative;
    font-size: 1rem;
  }

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    font-size: 0.5rem;
    line-height: 1.3rem;
    border-radius: 5px;
    margin-bottom: 10px;
  }
`;

interface Props {
  bookData: BookResponse;
  status: string;
  statusRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<unknown, Error>>;
  showToast: () => void;
  showErrorToast: () => void;
}

const BookStatusButton = ({
  bookData,
  statusRefetch,
  showToast = () => void 0,
  showErrorToast = () => void 0,
  status = "NEW",
}: Props) => {
  const [newStatus, setNewStatus] = useState("");
  const { saveBookMutation, refetchLibraryBooks, refetchFinishedBookCalendar } = useBook({
    status: newStatus,
  });
  const { mutateAddBookToCollection } = useCollection();
  const { isCollection, name } = useContext(CollectionParamContext);
  const { refetch: collectionBookListRefetch } = useContext(RefetchContext);

  const createBookPayload = (status?: BookStatus) => {
    return {
      title: bookData.title,
      author: bookData.author,
      pubDate: bookData.pubDate,
      description: bookData.description,
      isbn: bookData.isbn,
      cover: bookData.cover,
      categoryName: bookData.categoryName,
      publisher: bookData.publisher,
      status: status ?? null,
    };
  };

  const saveButtonOptions = [
    { status: BookStatus.READING, label: <p>읽는 중</p> },
    { status: BookStatus.TO_READ, label: <p>읽을 예정</p> },
    { status: BookStatus.FINISHED, label: <p>읽기 완료</p> },
  ];

  useEffect(() => {
    if (!newStatus) return;

    void Promise.all([
      statusRefetch(),
      refetchLibraryBooks(),
      refetchFinishedBookCalendar(),
    ])
      .then(() => {
        showToast();
      })
      .catch((error) => {
        showErrorToast();
        console.error(error);
      });
  }, [
    newStatus,
    statusRefetch,
    refetchLibraryBooks,
    showToast,
    showErrorToast,
    refetchFinishedBookCalendar,
  ]);

  const handleSaveBook = (status: BookStatus) => {
    const saveRequest = createBookPayload(status);
    saveBookMutation(saveRequest, {
      onSuccess: () => {
        setNewStatus(status);
      },
      onError: (error) => {
        showErrorToast();
        console.log(error);
      },
    });
  };

  const handleAddBookToCollection = () => {
    mutateAddBookToCollection(
      { dto: createBookPayload(), name: encodeURIComponent(name) },
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
          onClick={handleAddBookToCollection}
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
        saveButtonOptions.map((arg) => (
          <Button
            onClick={() => handleSaveBook(arg.status)}
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

export default BookStatusButton;
