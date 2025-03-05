import { useState } from "react";

export enum ModalTypes {
  "DELETE" = "DELETE",
  "STATUS_UPDATE" = "STATUS_UPDATE",
  "WYSIWYG" = "WYSIWYG",
  "DEFAULT" = "DEFAULT",
}

export const useModal = () => {
  const [modalType, setModalType] = useState<ModalTypes>(ModalTypes.DEFAULT);

  const openModal = (type: ModalTypes) => setModalType(type);

  const closeModal = () => setModalType(ModalTypes.DEFAULT);

  return { modalType, openModal, closeModal };
};
