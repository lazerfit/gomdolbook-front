import { styled } from "styled-components";
import Modal from "@/ui/Modal";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  width: 20px;
  position: absolute;
  right: 20px;
  top: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.4em;
`;

const Banner = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 34px;
`;

const EasyLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EasyLoginButton = styled.button`
  border-radius: 5px;
  padding: 15px;
  margin: 8px 0;
  font-family: ${(props) => props.theme.fonts.text}, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  color: white;
`;

interface Props {
  isModalOpened: boolean;
  onClose: () => void;
  onLoggedIn: () => void;
}

const LoginModal = (props: Props) => {
  if (!props.isModalOpened) return null;
  return (
    <Modal $innerWidth="360px" $innerHeight="fit-content" onClose={props.onClose}>
      <ContentWrapper>
        <CloseButton data-testid="closeBtn" onClick={props.onClose}>
          &times;
        </CloseButton>
        <Banner>로그인/회원가입</Banner>
        <EasyLoginWrapper>
          <EasyLoginButton
            style={{ backgroundColor: "#FEE500", color: "black" }}
            onClick={props.onLoggedIn}
          >
            카카오로 시작하기
          </EasyLoginButton>
          <EasyLoginButton
            style={{ backgroundColor: "#00DE5A" }}
            onClick={props.onLoggedIn}
          >
            네이버로 시작하기
          </EasyLoginButton>
        </EasyLoginWrapper>
      </ContentWrapper>
    </Modal>
  );
};

export default LoginModal;
