import { styled } from "styled-components";
import { motion } from "framer-motion";
import Modal from "./Modal.tsx";
import { ButtonMd } from "@/styles/common.styled.ts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ModalTypes, useModal } from "@/hooks/useModal.ts";
import { ReactNode, useState } from "react";
import { itemVariants } from "./frameMotion/variants.ts";

const ButtonWrapper = styled(motion.section)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  position: relative;
`;

const ThreeDotIcon = styled(motion.nav)`
  cursor: pointer;
`;

const DropdownMenu = styled(motion.ul)`
  padding: 10px;
  width: 90px;
  min-width: 5.625rem;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0 15px 25px,
    rgba(0, 0, 0, 0.05) 0 5px 10px;
  position: absolute;
  text-align: center;
  border-radius: 8px;
  top: 40px;
  right: 5px;
  cursor: pointer;
  background-color: white;
  list-style: none;
`;

export const DropdownLink = styled(motion.li)`
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  border-bottom: 1px solid #d3d3d3;
  list-style: none;

  &:last-child {
    border-bottom: none;
  }

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
  children?: ReactNode;
}

const ThreeDotMenu = ({ onRemove = () => void 0, isLoading, children }: Props) => {
  const { modalType, openModal, closeModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
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
      <ButtonWrapper initial={false} animate={isOpen ? "open" : "closed"}>
        <ThreeDotIcon
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <BsThreeDotsVertical data-tesid="threedot" />
        </ThreeDotIcon>
        <DropdownMenu
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.5,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(0% 0% 100% 100% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
          initial="closed"
        >
          <DropdownLink
            variants={itemVariants}
            onClick={() => openModal(ModalTypes.DELETE)}
          >
            삭제하기
          </DropdownLink>
          {children}
        </DropdownMenu>
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
              <SubmitButton onClick={handleSubmit} disabled={isLoading}>
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
