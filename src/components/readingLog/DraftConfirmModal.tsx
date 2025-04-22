import { styled } from "styled-components";
import { Modal } from "@/ui/index.ts";
import { motion } from "framer-motion";

const ModalContent = styled.div``;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: black;
  color: white;
  margin-top: 20px;
  transition: all 0.5s ease;
  border-radius: 5px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onDiscard: () => void;
}

const DraftConfirmModal = ({ isOpen, onConfirm, onDiscard }: Props) => {
  return (
    <>
      {isOpen && (
        <Modal innerHeight="fit-content" innerWidth="300px" onClose={onDiscard}>
          <ModalContent>
            <p>임시 저장된 내용이 있습니다</p>
            <p>임시저장된 내용을 불러오시겠습니까?</p>
          </ModalContent>
          <ButtonGroup>
            <Button onClick={onConfirm} whileTap={{ scale: 0.8 }}>
              불러오기
            </Button>
            <Button onClick={onDiscard} whileTap={{ scale: 0.8 }}>
              새로 작성
            </Button>
          </ButtonGroup>
        </Modal>
      )}
    </>
  );
};

export default DraftConfirmModal;
