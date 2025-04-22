import {
  ThreeDotMenu,
  BookPublisher,
  BookListSkeletonLoader,
  Modal,
  Toast,
} from "@/ui/index.ts";
import { useParams } from "react-router-dom";
import { useReadingLog } from "@/hooks/index.ts";
import { ModalTypes, useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { DropdownLink } from "@/ui/ThreeDotMenu.tsx";
import { TranslateBookStatus } from "@/utils/index.ts";
import { Ratings } from "../components/readingLog/index.ts";
import { itemVariants } from "@/ui/frameMotion/variants.ts";
import { useReadingLogNote } from "@/hooks/useReadingLogNote.ts";
import * as S from "./ReadingLogPage.styles.ts";
import ReadingLogNote from "@/components/readingLog/ReadingLogNote.tsx";
import AutoSaveReadingLogEditor from "@/components/readingLog/AutoSaveReadingLogEditor.tsx";
import { useState } from "react";

const ReadingLogPage = () => {
  const { isbn = "" } = useParams();
  const { modalType, openModal, closeModal } = useModal();
  const { isToastVisible, hasToastError, openToast, openErrorToast, closeToast } =
    useToast();
  const {
    fetchedReadingLog,
    isFetchingReadingLog,
    refetchReadingLog,
    updateReadingLogMutation,
    fetchedStatus,
    refetchStatus,
    updateStatusMutation,
  } = useReadingLog({ statusIsbn: isbn, readingLogIsbn: isbn });
  const {
    noteContentData,
    rating,
    setRating,
    notePlaceholder,
    setNotePlaceholder,
    note,
    setNote,
  } = useReadingLogNote(fetchedReadingLog);
  const [isFirstOpened, setIsFirstOpened] = useState(false);

  const openReadingLogModal = (id: string, title: string, placeholder: string) => {
    openModal(ModalTypes.WYSIWYG);
    setNote({ id, title, text: placeholder });
    setNotePlaceholder(placeholder);
    setIsFirstOpened(true);
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

    updateReadingLogMutation(data, {
      onSuccess: () => {
        refetchReadingLog()
          .then(() => {
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
    updateStatusMutation(
      { isbn: isbn, status: status },
      {
        onSuccess: () => {
          refetchStatus()
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

  if (isFetchingReadingLog) {
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
        {fetchedStatus === "READING" && (
          <DropdownLink
            variants={itemVariants}
            onClick={() => openModal(ModalTypes.STATUS_UPDATE)}
          >
            상태변경
          </DropdownLink>
        )}
      </ThreeDotMenu>
      <S.BookTitle>{fetchedReadingLog.title}</S.BookTitle>
      <BookPublisher
        author={fetchedReadingLog.author}
        publisher={fetchedReadingLog.publisher}
        date={fetchedReadingLog.pubDate}
      />
      <S.BookImageWrapper>
        <S.BookImage src={fetchedReadingLog.cover} />
      </S.BookImageWrapper>
      <Ratings isbn={isbn} initialRating={rating} refetch={refetchReadingLog} />
      <S.ReadingStatus>{TranslateBookStatus(fetchedStatus)}</S.ReadingStatus>
      <ReadingLogNote
        noteContentData={noteContentData}
        openReadingLogModal={openReadingLogModal}
      />
      <AutoSaveReadingLogEditor
        onClose={closeModal}
        modalType={modalType}
        note={note}
        placeholder={notePlaceholder}
        setPlaceholder={setNotePlaceholder}
        onChangeValue={handleNoteTextChange}
        onSave={handleSaveReadingLog}
        isFirstOpened={isFirstOpened}
        setIsFirstOpened={setIsFirstOpened}
      />
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
