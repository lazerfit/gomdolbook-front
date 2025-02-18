import { styled } from "styled-components";
import Modal from "./Modal.tsx";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalBtn = styled.button`
  margin-left: auto;
  background-color: ${(prop) => prop.theme.colors.black};
  padding: 10px;
  border-radius: 10px;
  color: ${(prop) => prop.theme.colors.white};
  cursor: pointer;
`;

interface Props {
  close: () => void;
}

const LoginRequireModal = (props: Props) => {
  return (
    <Modal $innerWidth="300px" $innerHeight="140px" onClose={props.close}>
      <ModalContent>
        <div>로그인이 필요합니다.</div>
        <ModalBtn onClick={props.close}>확인</ModalBtn>
      </ModalContent>
    </Modal>
  );
};

export default LoginRequireModal;
