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

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 35px;
    padding: 15px 30px;
  }
`;

const ModalDescription = styled.div`
  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 15px;
    font-size: 1.4rem;
  }
`;

interface Props {
  onClose: () => void;
}

const LoginRequireModal = (props: Props) => {
  return (
    <Modal innerWidth="300px" innerHeight="140px" onClose={props.onClose}>
      <ModalContent>
        <ModalDescription>로그인이 필요합니다.</ModalDescription>
        <ModalBtn onClick={props.onClose}>확인</ModalBtn>
      </ModalContent>
    </Modal>
  );
};

export default LoginRequireModal;
