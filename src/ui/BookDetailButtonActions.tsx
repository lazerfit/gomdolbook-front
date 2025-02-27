import { styled } from "styled-components";
import { ButtonMd } from "@/styles/common.styled.ts";
import { useSaveReadingLogQuery, useGetStatus } from "@/hooks/queries/useReadingLog.ts";
import { BookStatus } from "@/api/services/BoookService.ts";
import translateBookStatus from "@/utils/TranslateBookStatus.ts";
import type { IBookResponse } from "@/api/services/BoookService.ts";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAddBook } from "@/hooks/queries/useCollection.ts";
import { RefetchContext } from "@/api/contexts/contexts/refetchContext.ts";

const ButtonWrapper = styled.div`
  display: flex;
  gap: 13px;
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

const SaveButton = styled(ButtonMd)`
  border: 2px solid ${(porps) => porps.theme.colors.black};
  position: relative;
  overflow: hidden;
  padding: 7px 20px;

  > p {
    position: relative;
    font-size: 1rem;
  }

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    background-color: red;
    border-radius: 20px;
    top: 0;
    left: 0;
  }

  &:nth-child(1)::before {
    background-color: #acd7ec;
  }

  &:nth-child(2)::before {
    background-color: #f4989c;
  }

  &:nth-child(3)::before {
    background-color: #4ea699;
  }

  &:hover::before {
    content: "";
    width: 100%;
    transition: 0.5s;
  }
`;

interface Props {
  isbn: string;
  bookData: IBookResponse;
  showToast: () => void;
  showErrorToast: () => void;
}

const BookDeatilButtonActions = (props: Props) => {
  const params = useParams();
  const { mutate: saveReadingLogWithStatus } = useSaveReadingLogQuery();
  const { mutate: addbook } = useAddBook();
  const [getCollectionName, setGetCollectionName] = useState("");
  const [isCollection, setIsCollection] = useState(false);
  const { refetch: collectionBookListRefetch } = useContext(RefetchContext);
  const { data: statusData, refetch: statusRefetch } = useGetStatus(props.isbn);
  const status = statusData?.data ?? "NEW";

  useEffect(() => {
    if (params.name) {
      setIsCollection(true);
      setGetCollectionName(params.name);
    }
  }, [params.name]);

  const getReadingLogSaveRequest = (status?: BookStatus) => {
    return {
      title: props.bookData.title,
      author: props.bookData.author,
      pubDate: props.bookData.pubDate,
      description: props.bookData.description,
      isbn13: props.bookData.isbn13,
      cover: props.bookData.cover,
      categoryName: props.bookData.categoryName,
      publisher: props.bookData.publisher,
      status: status ?? null,
    };
  };

  const saveReadingLog = (status: BookStatus) => {
    const saveRequest = getReadingLogSaveRequest(status);
    saveReadingLogWithStatus(saveRequest, {
      onSuccess: () => {
        statusRefetch()
          .then(() => props.showToast())
          .catch((error) => console.log(error));
      },
      onError: (error) => {
        props.showErrorToast();
        console.log(error);
      },
    });
  };

  const onAddBook = () => {
    addbook(
      { dto: getReadingLogSaveRequest(), name: encodeURIComponent(getCollectionName) },
      {
        onSuccess: () => {
          collectionBookListRefetch()
            .then(() => setIsCollection(false))
            .catch((error) => console.log(error));
        },
        onError: (error) => {
          props.showErrorToast();
          console.log(error);
        },
      },
    );
  };

  return (
    <ButtonWrapper>
      {isCollection && status === "NEW" && (
        <SaveButton data-testid="collectionBtn" onClick={onAddBook}>
          <p>추가하기</p>
        </SaveButton>
      )}
      {status !== "NEW" ? (
        <ReadingStatus data-testid="readingStatus">
          {translateBookStatus(status)}
        </ReadingStatus>
      ) : (
        <>
          <SaveButton
            data-testid="saveReadingLog"
            onClick={() => saveReadingLog(BookStatus.READING)}
          >
            <p>읽는 중</p>
          </SaveButton>
          <SaveButton onClick={() => saveReadingLog(BookStatus.TO_READ)}>
            <p>읽을 예정</p>
          </SaveButton>
          <SaveButton onClick={() => saveReadingLog(BookStatus.FINISHED)}>
            <p>읽기 완료</p>
          </SaveButton>
        </>
      )}
    </ButtonWrapper>
  );
};

export default BookDeatilButtonActions;
