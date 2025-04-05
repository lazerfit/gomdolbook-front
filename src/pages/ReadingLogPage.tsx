import { FaRegPenToSquare } from "react-icons/fa6";
import {
  ThreeDotMenu,
  BookPublisher,
  BookListSkeletonLoader,
  Modal,
  Toast,
} from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useReadingLog } from "@/hooks/index.ts";
import { useEffect, useState } from "react";
import TinyMCE from "@/utils/TinyMCE.tsx";
import sanitizeHtml from "sanitize-html";
import { ModalTypes, useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { DropdownLink } from "@/ui/ThreeDotMenu.tsx";
import { TranslateBookStatus } from "@/utils/index.ts";
import { Ratings } from "../components/readingLog/index.ts";
import { itemVariants } from "@/ui/frameMotion/variants.ts";
import * as S from "./ReadingLogPage.styles.ts";

const ReadingLogPage = () => {
  const params = useParams();
  const isbn = params.isbn ?? "";
  const { modalType, openModal, closeModal } = useModal();
  const { isToastVisible, hasToastError, openToast, openErrorToast, closeToast } =
    useToast();
  const [note, setNote] = useState({ id: "", title: "", text: "" });
  const {
    readingLog,
    isReadingLogLoading,
    readingLogRefetch,
    updateReadingLog,
    status,
    statusRefetch,
    updateStatus,
  } = useReadingLog({ statusIsbn: isbn, readingLogIsbn: isbn });
  const [rating, setRating] = useState(readingLog.rating);

  useEffect(() => {
    if (readingLog) {
      setRating(readingLog.rating);
    }
  }, [readingLog]);

  const openReadingLogModal = (id: string, title: string, placeholder: string) => {
    openModal(ModalTypes.WYSIWYG);
    setNote({ id: id, title: title, text: placeholder });
  };

  const handleNoteTextChange = (text: string) => {
    if (text.trim() !== "") {
      setNote((prev) => ({ ...prev, text: text }));
    }
  };

  const handleSaveReadingLog = () => {
    const data = {
      isbn: isbn,
      note: note.id,
      text: note.text,
    };

    updateReadingLog(data, {
      onSuccess: () => {
        readingLogRefetch()
          .then(() => {
            openModal(ModalTypes.WYSIWYG);
            openToast();
          })
          .catch((error) => console.log(error));
      },
      onError: (error) => {
        console.log(error);
        openErrorToast();
      },
    });
  };

  const handleUpdateStatus = (status: string) => {
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

  const handleResetRating = () => {
    setRating(0);
    closeModal();
  };

  const sanitizeHtmlContent = (text: string) => {
    const sanitized = sanitizeHtml(text);

    return { __html: sanitized };
  };

  interface Data {
    note: string;
    title: string;
    text: string;
  }

  const noteContentData: Data[] = [
    {
      note: "note1",
      title: "1. 무엇을 다룬 책인지 알아내기",
      text:
        readingLog.note1 === ""
          ? "중심 내용, 요점정리, 저자가 풀어가려는 문제 등을 적어주세요."
          : readingLog.note1,
    },
    {
      note: "note2",
      title: "2. 내용 해석하기",
      text:
        readingLog.note2 === ""
          ? "중요한 단어를 저자가 어떤 의미로 사용하는지, 주요 명제, 논증, 풀어낸 문제와 그렇지 못한 문제를 구분하고, 풀지 못한 문제를 저자도 아는지 파악해보세요."
          : readingLog.note2,
    },
    {
      note: "note3",
      title: "3. 비평하기",
      text:
        readingLog.note3 === ""
          ? "저자가 잘 알지 못하는 부분, 잘못 알고 있는 부분, 논리적이지 못한 부분, 분석한 내용이나 설명이 불완전한 부분을 적어보세요."
          : readingLog.note3,
    },
  ];

  if (isReadingLogLoading) {
    return <BookListSkeletonLoader />;
  }

  return (
    <S.ReadingLogWrapper
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
          <DropdownLink
            variants={itemVariants}
            onClick={() => openModal(ModalTypes.STATUS_UPDATE)}
          >
            상태변경
          </DropdownLink>
        )}
      </ThreeDotMenu>
      <S.BookTitle>{readingLog.title}</S.BookTitle>
      <BookPublisher
        author={readingLog.author}
        publisher={readingLog.publisher}
        date={readingLog.pubDate}
      />
      <S.BookImageWrapper>
        <S.BookImage src={readingLog.cover} />
      </S.BookImageWrapper>
      <Ratings isbn={isbn} initialRating={rating} refetch={readingLogRefetch} />
      <S.ReadingStatus>{TranslateBookStatus(status)}</S.ReadingStatus>
      <S.ReadingLogNoteBox>
        {noteContentData.map((content) => (
          <S.ReadingLogNote key={content.note}>
            <S.NoteTitle>
              <h4>{content.title}</h4>
              <S.ModifyButton
                data-testid={"modifyBtn-" + content.note}
                onClick={() =>
                  openReadingLogModal(content.note, content.title, content.text)
                }
              >
                <FaRegPenToSquare />
              </S.ModifyButton>
            </S.NoteTitle>
            <S.NoteContent
              dangerouslySetInnerHTML={sanitizeHtmlContent(content.text)}
            ></S.NoteContent>
          </S.ReadingLogNote>
        ))}
      </S.ReadingLogNoteBox>
      {modalType === ModalTypes.WYSIWYG && (
        <Modal innerWidth="1180px" innerHeight="90%" onClose={closeModal}>
          <S.ModalWrapper>
            <S.ModalContentWrapper>
              <S.ModalTitle>{note.title}</S.ModalTitle>
              <S.ModalWysiwyg>
                <TinyMCE placeholder={note.text} onChangeValue={handleNoteTextChange} />
                <S.ModalSaveButtonWrapper>
                  <S.ModalSaveButton onClick={closeModal}>취소하기</S.ModalSaveButton>
                  <S.ModalSaveButton onClick={handleSaveReadingLog}>
                    저장하기
                  </S.ModalSaveButton>
                </S.ModalSaveButtonWrapper>
              </S.ModalWysiwyg>
            </S.ModalContentWrapper>
          </S.ModalWrapper>
        </Modal>
      )}
      {modalType === ModalTypes.STATUS_UPDATE && (
        <Modal innerHeight="fit-content" innerWidth="300px" onClose={closeModal}>
          <S.ModalUpdateButtonWrapper>
            <S.ModalUpdateButton onClick={() => handleUpdateStatus("FINISHED")}>
              다 읽었어요
            </S.ModalUpdateButton>
            <S.ModalUpdateButton onClick={handleResetRating}>
              별점 수정
            </S.ModalUpdateButton>
          </S.ModalUpdateButtonWrapper>
        </Modal>
      )}
      <Toast
        onShow={isToastVisible}
        onError={hasToastError}
        onClose={closeToast}
        message={{
          success: "성공적으로 저장하였어요.",
          error: "다시 시도해주세요.",
        }}
      />
    </S.ReadingLogWrapper>
  );
};

export default ReadingLogPage;
