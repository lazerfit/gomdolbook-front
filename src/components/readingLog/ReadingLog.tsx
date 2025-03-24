import { styled } from "styled-components";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ThreeDotMenu, Publisher, BookListSkeleton, Modal, Toast } from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useReadingLog } from "@/hooks/queries/useReadingLog.ts";
import { useEffect, useState } from "react";
import TinyMCE from "@/utils/TinyMCE.tsx";
import sanitizeHtml from "sanitize-html";
import { ModalTypes, useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { Item } from "@/ui/ThreeDotMenu.tsx";
import { TranslateBookStatus } from "@/utils/index.ts";
import Ratings from "./Ratings.tsx";
import { itemVariants } from "@/ui/frameMotion/variants.ts";
import { motion } from "framer-motion";

const Wrapper = styled(motion.section)`
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
  box-shadow: ${(props) => props.theme.shadow.light};
  margin-top: 13px;
`;

const Status = styled.div`
  margin-top: 20px;
  width: 90px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray3};
  color: ${(props) => props.theme.colors.gray6};
  box-shadow: ${(props) => props.theme.shadow.light};
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
  box-shadow: ${(props) => props.theme.shadow.light};
  border: 2px solid black;
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

const ModalUpdateButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex-direction: column;
  gap: 10px;
`;

const ModalUpdateButton = styled.button`
  padding: 10px;
  font-size: 1.2rem;
  min-width: 100px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
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
  const { modalType, openModal, closeModal } = useModal();
  const { isToastVisible, isErrorToast, onShowToast, onShowErrorToast, onCloseToast } =
    useToast();
  const [noteId, setNoteId] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [value, setValue] = useState("");
  const {
    readingLog,
    isReadingLogLoading,
    readingLogRefetch,
    updateReadingLog,
    status,
    statusRefetch,
    updateStatus,
  } = useReadingLog({ statusIsbn: isbn, readingLogIsbn: isbn });
  const [ratings, setRatings] = useState(readingLog.rating);

  useEffect(() => {
    if (readingLog) {
      setRatings(readingLog.rating);
    }
  }, [readingLog]);

  const onOpenReadingLog = (id: string, title: string, placeholder: string) => {
    openModal(ModalTypes.WYSIWYG);
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

    updateReadingLog(data, {
      onSuccess: () => {
        readingLogRefetch()
          .then(() => {
            openModal(ModalTypes.WYSIWYG);
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

  const onUpdateStatus = (status: string) => {
    updateStatus(
      { isbn: isbn, status: status },
      {
        onSuccess: () => {
          statusRefetch()
            .then(() => closeModal())
            .catch((error) => console.log(error));
        },
        onError: (error) => console.log(error),
      },
    );
  };

  const onModifyStar = () => {
    setRatings(0);
    closeModal();
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
        readingLog.note1 === ""
          ? "중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요."
          : readingLog.note1,
    },
    {
      note: "note2",
      title: "2. 내용 해석하기",
      value:
        readingLog.note2 === ""
          ? "중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요."
          : readingLog.note2,
    },
    {
      note: "note3",
      title: "3. 비평하기",
      value:
        readingLog.note3 === ""
          ? "저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요."
          : readingLog.note3,
    },
  ];

  if (isReadingLogLoading) {
    return <BookListSkeleton />;
  }

  return (
    <Wrapper
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
    >
      <ThreeDotMenu onRemove={() => void 0} isLoading={false}>
        {status === "READING" && (
          <Item
            variants={itemVariants}
            onClick={() => openModal(ModalTypes.STATUS_UPDATE)}
          >
            상태변경
          </Item>
        )}
      </ThreeDotMenu>
      <Title>{readingLog.title}</Title>
      <Publisher
        author={readingLog.author}
        publisher={readingLog.publisher}
        date={readingLog.pubDate}
      />
      <ImageWrapper>
        <Image src={readingLog.cover} />
      </ImageWrapper>
      <Ratings isbn={isbn} initialStar={ratings} refetch={readingLogRefetch} />
      <Status>{TranslateBookStatus(status)}</Status>
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
      {modalType === ModalTypes.WYSIWYG && (
        <Modal innerWidth="1180px" innerHeight="90%" onClose={closeModal}>
          <ModalWrapper>
            <ModalContentWrapper>
              <ModalTitle>{noteTitle}</ModalTitle>
              <ModalWysiwyg>
                <TinyMCE placeholder={placeholder} onChangeValue={onChangeValue} />
                <ModalButtonWrapper>
                  <ModalSaveButton onClick={closeModal}>취소하기</ModalSaveButton>
                  <ModalSaveButton onClick={onSaveValue}>저장하기</ModalSaveButton>
                </ModalButtonWrapper>
              </ModalWysiwyg>
            </ModalContentWrapper>
          </ModalWrapper>
        </Modal>
      )}
      {modalType === ModalTypes.STATUS_UPDATE && (
        <Modal innerHeight="fit-content" innerWidth="300px" onClose={closeModal}>
          <ModalUpdateButtonWrapper>
            <ModalUpdateButton onClick={() => onUpdateStatus("FINISHED")}>
              다 읽었어요
            </ModalUpdateButton>
            <ModalUpdateButton onClick={onModifyStar}>별점 수정</ModalUpdateButton>
          </ModalUpdateButtonWrapper>
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
