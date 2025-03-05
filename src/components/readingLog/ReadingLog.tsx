import { styled } from "styled-components";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ThreeDotMenu, Publisher, BookListSkeleton, Modal, Toast } from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useGetReadinglog, useUpdateReadingLog } from "@/hooks/queries/useReadingLog.ts";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import TinyMCE from "@/utils/TinyMCE.tsx";
import sanitizeHtml from "sanitize-html";

const Wrapper = styled.section`
  margin: 34px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3``;

const ImageWrapper = styled.div`
  width: 200px;
  min-width: 12.5rem;
  text-align: center;
`;

const Image = styled.img`
  width: 200px;
  min-width: 12.5rem;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  border-radius: 8px;
  margin-top: 13px;
`;

const Rating = styled.div`
  width: 200px;
  min-width: 12.5rem;
  margin-top: 21px;
  font-size: 1.313rem;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  gap: 13px;
  margin-top: 40px;
`;

const AnalyzeContent = styled.article`
  width: 600px;
  min-width: 37.5rem;
  min-height: 18.75rem;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModifyButton = styled.div`
  background-color: transparent;
  font-size: 1.125rem;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 10px;
  width: 100%;
  max-height: 300px;
  min-height: 9.375rem;
  color: ${(props) => props.theme.colors.gray5};
  font-size: 0.938rem;
  overflow-y: scroll;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  margin: 10px 10px 0 auto;
  cursor: pointer;
  padding: 5px;
  font-size: 1.2rem;
`;

const ModalContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 100px 100px;
`;

const ModalTitle = styled.h1`
  font-size: 1.5rem;
`;

const ModalWysiwyg = styled.div`
  margin-top: 30px;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalSaveButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.gray4};
  border-radius: 10px;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(5px, -5px);
    box-shadow: -3px 3px #cd6133;
  }
`;

interface Data {
  note: string;
  title: string;
  value: string;
}

const ReadingLog = () => {
  const params = useParams();
  const isbn = params.isbn ?? "";
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isErrorToast, setIsErrorToast] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [value, setValue] = useState("");
  const { data, isLoading, refetch: readingLogRefetch } = useGetReadinglog(isbn);
  const { mutate: saveReadingLog } = useUpdateReadingLog();
  const response = data?.data ?? {
    title: "default",
    author: "default",
    pubDate: "default",
    cover: "default",
    publisher: "default",
    status: "default",
    note1: "default note1",
    note2: "default note2",
    note3: "default note3",
  };

  const onCloseModal = () => {
    setIsModalOpened(false);
  };
  const onShowToast = () => {
    setIsToastVisible(true);
    setIsErrorToast(false);
  };
  const onShowErrorToast = () => {
    setIsErrorToast(true);
  };
  const onCloseToast = () => {
    setIsToastVisible(false);
  };

  const onOpenReadingLog = (id: string, title: string, placeholder: string) => {
    setIsModalOpened(true);
    setNoteId(id);
    setNoteTitle(title);
    setPlaceholder(placeholder);
  };

  const onChangeValue = (text: string) => {
    if (text.trim() !== "") {
      setValue(text);
    }
  };

  const onSaveValue = () => {
    const data = {
      isbn: isbn,
      note: noteId,
      value: value,
    };

    saveReadingLog(data, {
      onSuccess: () => {
        readingLogRefetch()
          .then(() => {
            setIsModalOpened(false);
            onShowToast();
          })
          .catch((error) => console.log(error));
      },
      onError: (error) => {
        console.log(error);
        onShowErrorToast();
      },
    });
  };

  const onSanitize = (text: string) => {
    const sanitized = sanitizeHtml(text);

    return { __html: sanitized };
  };

  const analyzeContentData: Data[] = [
    {
      note: "note1",
      title: "1. 무엇을 다룬 책인지 알아내기",
      value:
        response.note1 === ""
          ? "중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요."
          : response.note1,
    },
    {
      note: "note2",
      title: "2. 내용 해석하기",
      value:
        response.note2 === ""
          ? "중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요."
          : response.note2,
    },
    {
      note: "note3",
      title: "3. 비평하기",
      value:
        response.note3 === ""
          ? "저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요."
          : response.note3,
    },
  ];

  if (isLoading) {
    return <BookListSkeleton />;
  }

  return (
    <Wrapper>
      <ThreeDotMenu onRemove={() => void 0} isLoading={false} />
      <Title>{response.title}</Title>
      <Publisher
        author={response.author}
        publisher={response.publisher}
        date={response.pubDate}
      />
      <ImageWrapper>
        <Image src={response.cover} />
        <Rating>⭐⭐⭐⭐⭐</Rating>
      </ImageWrapper>
      <ContentWrapper>
        {analyzeContentData.map((content) => (
          <AnalyzeContent key={content.note}>
            <ContentTitle>
              <h4>{content.title}</h4>
              <ModifyButton
                data-testid={"modifyBtn-" + content.note}
                onClick={() =>
                  onOpenReadingLog(content.note, content.title, content.value)
                }
              >
                <FaRegPenToSquare />
              </ModifyButton>
            </ContentTitle>
            <Content dangerouslySetInnerHTML={onSanitize(content.value)}></Content>
          </AnalyzeContent>
        ))}
      </ContentWrapper>
      {isModalOpened && (
        <Modal innerWidth="1180px" innerHeight="90%" onClose={onCloseModal}>
          <ModalWrapper>
            <CloseButton onClick={() => onCloseModal()}>
              <GrClose />
            </CloseButton>
            <ModalContentWrapper>
              <ModalTitle>{noteTitle}</ModalTitle>
              <ModalWysiwyg>
                <TinyMCE placeholder={placeholder} onChangeValue={onChangeValue} />
                <ModalButtonWrapper>
                  <ModalSaveButton onClick={onCloseModal}>취소하기</ModalSaveButton>
                  <ModalSaveButton onClick={onSaveValue}>저장하기</ModalSaveButton>
                </ModalButtonWrapper>
              </ModalWysiwyg>
            </ModalContentWrapper>
          </ModalWrapper>
        </Modal>
      )}
      <Toast
        isVisible={isToastVisible}
        isError={isErrorToast}
        onChangeVisibility={onCloseToast}
        message={{
          success: "성공적으로 저장하였어요.",
          error: "다시 시도해주세요.",
        }}
      />
    </Wrapper>
  );
};

export default ReadingLog;
