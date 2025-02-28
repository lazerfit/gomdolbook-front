import { styled } from "styled-components";
import { Modal } from "@/ui/index.ts";
import kakaoLoginImage from "@/assets/img/kakaotalk_sharing_btn_medium.png";
import googleLoginImage from "@/assets/img/web_light_sq_na@1x.png";
import githubLoginImgae from "@/assets/img/github-mark.png";

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
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

const LoginButton = styled.button`
  cursor: pointer;
  margin: 8px 0%;
`;

interface Props {
  isModalOpened: boolean;
  onClose: () => void;
  github: () => void;
  kakao: () => void;
  google: () => void;
}

const LoginModal = (props: Props) => {
  if (!props.isModalOpened) return null;
  return (
    <Modal innerWidth="360px" innerHeight="fit-content" onClose={props.onClose}>
      <ContentWrapper>
        <CloseButton data-testid="closeBtn" onClick={props.onClose}>
          &times;
        </CloseButton>
        <Banner>로그인/회원가입</Banner>
        <EasyLoginWrapper>
          <LoginButton onClick={props.kakao} style={{ cursor: "pointer" }}>
            <img
              src={kakaoLoginImage}
              style={{ width: "40px", height: "40px" }}
              alt="카카오 로그인"
            />
          </LoginButton>
          <LoginButton onClick={props.github}>
            <img
              src={githubLoginImgae}
              style={{ width: "40px", height: "40px" }}
              alt="깃헙 로그인"
            />
          </LoginButton>
          <LoginButton onClick={props.google} style={{ cursor: "pointer" }}>
            <img src={googleLoginImage} alt="구글 로그인" />
          </LoginButton>
        </EasyLoginWrapper>
      </ContentWrapper>
    </Modal>
  );
};

export default LoginModal;
