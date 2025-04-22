import React, { useState, useEffect } from "react";
import { ModalTypes } from "@/hooks/useModal.ts";
import { Modal } from "@/ui/index.ts";
import * as S from "@/pages/ReadingLogPage.styles.ts";
import TinyMCE from "@/utils/TinyMCE.tsx";
import DOMPurify from "dompurify";
import DraftConfirmModal from "./DraftConfirmModal.tsx";

interface Props {
  onClose: () => void;
  modalType: ModalTypes;
  note: {
    id: string;
    title: string;
    text: string;
  };
  placeholder: string;
  setPlaceholder: React.Dispatch<React.SetStateAction<string>>;
  onChangeValue: (text: string) => void;
  onSave: () => void;
  isFirstOpened: boolean;
  setIsFirstOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const AutoSaveReadingLogEditor = ({
  onClose: closeModal,
  modalType,
  note,
  placeholder: notePlaceholder,
  setPlaceholder,
  onChangeValue: handleNoteTextChange,
  onSave: handleSaveReadingLog,
  isFirstOpened,
  setIsFirstOpened,
}: Props) => {
  const savedDraft = localStorage.getItem(`readingLogNote_${note.id}`);
  const [isDraftConfirmModalOpen, setIsDraftConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (savedDraft && modalType === ModalTypes.WYSIWYG && isFirstOpened) {
      setIsDraftConfirmModalOpen(true);
    }
  }, [savedDraft, modalType, isFirstOpened]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (
        note.text !== "" &&
        note.text !== `<p>${notePlaceholder}</p>` &&
        modalType === ModalTypes.WYSIWYG
      ) {
        localStorage.setItem(`readingLogNote_${note.id}`, DOMPurify.sanitize(note.text));
      }
    }, 30000);

    return () => {
      clearInterval(autoSaveInterval);
      if (isFirstOpened) {
        setIsFirstOpened(false);
      }
    };
  }, [note.id, note.text, notePlaceholder, modalType, isFirstOpened, setIsFirstOpened]);

  const handleConfirmDraft = () => {
    if (savedDraft) {
      setPlaceholder(savedDraft);
      localStorage.removeItem(`readingLogNote_${note.id}`);
    }
    setIsDraftConfirmModalOpen(false);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(`readingLogNote_${note.id}`);
    setIsDraftConfirmModalOpen(false);
  };

  return (
    <>
      {modalType === ModalTypes.WYSIWYG && (
        <Modal innerWidth="1180px" innerHeight="90%" onClose={closeModal}>
          <S.ModalWrapper>
            <S.ModalContentWrapper>
              <S.ModalTitle>{note.title}</S.ModalTitle>
              <S.ModalWysiwyg>
                <TinyMCE
                  placeholder={notePlaceholder}
                  onChangeValue={handleNoteTextChange}
                />
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
      <DraftConfirmModal
        isOpen={isDraftConfirmModalOpen}
        onConfirm={handleConfirmDraft}
        onDiscard={handleDiscardDraft}
      />
    </>
  );
};

export default AutoSaveReadingLogEditor;
