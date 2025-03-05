import { styled } from "styled-components";
import Modal from "./Modal.tsx";
import { ButtonMd } from "@/styles/common.styled.ts";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ModalTypes, useModal } from "@/hooks/useModal.ts";

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 10px;
  position: relative;
`;

const Menu = styled.div`
  padding: 10px;
  width: 90px;
  min-width: 5.625rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  position: absolute;
  text-align: center;
  border-radius: 8px;
  top: 40px;
  right: 5px;
  display: none;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    background-color: ${(props) => props.theme.colors.white};
    width: 10px;
    height: 10px;
    top: -5px;
    transform: rotate(45deg);
    right: 10%;
  }
`;

const ButtonInput = styled.input`
  display: none;

  &:checked ~ ${Menu} {
    display: block;
  }
`;

const ButtonLabel = styled.label`
  display: block;
  width: 40px;
  height: 30px;
  text-align: center;
  padding: 5px;
  position: relative;
  cursor: pointer;
`;

const MenuButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    font-size: ${(props) => props.theme.fonts.size600};
  }
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ModalCloseButton = styled(ButtonMd)`
  color: ${(props) => props.theme.colors.gray4};
  background-color: ${(props) => props.theme.colors.gray7};
`;

const SubmitButton = styled(ButtonMd)`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
`;

interface Props {
  onRemove: () => void;
  statusUpdate?: () => void;
  isLoading: boolean;
}

const ThreeDotMenu = ({
  onRemove = () => void 0,
  isLoading,
  statusUpdate = () => void 0,
}: Props) => {
  const { modalType, openModal, closeModal } = useModal();

  const onSubmit = () => {
    try {
      onRemove();
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <ButtonWrapper>
        <ButtonInput type="checkbox" id="trigger" />
        <ButtonLabel htmlFor="trigger">
          <BsThreeDotsVertical data-tesid="threedot" />
        </ButtonLabel>
        <Menu>
          <MenuButton onClick={() => openModal(ModalTypes.DELETE)}>삭제하기</MenuButton>
          <MenuButton onClick={statusUpdate}>상태변경</MenuButton>
        </Menu>
      </ButtonWrapper>
      {modalType === ModalTypes.DELETE && (
        <Modal
          innerHeight="fit-content"
          innerWidth="330px"
          onClose={closeModal}
          bgc="#262627"
          color="#fafafa"
        >
          <ModalWrapper>
            <div>정말 삭제하시겠습니까?</div>
            <ModalButtonWrapper>
              <SubmitButton onClick={onSubmit} disabled={isLoading}>
                삭제
              </SubmitButton>
              <ModalCloseButton onClick={closeModal}>취소</ModalCloseButton>
            </ModalButtonWrapper>
          </ModalWrapper>
        </Modal>
      )}
    </>
  );
};

export default ThreeDotMenu;
