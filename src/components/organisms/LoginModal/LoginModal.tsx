import { styled } from 'styled-components';
import kakaoLoginImage from '@/assets/img/kakaotalk.png';
import googleLoginImage from '@/assets/img/web_light_rd_na@1x.png';
import githubLoginImage from '@/assets/img/github-mark.png';
import Modal from '@/components/templates/Modal/Modal';
import { MODAL_SIZES } from '@/utils/variables';
import { mediaMax } from '@/utils';

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const EasyLoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--space-2-5);

  ${mediaMax.mobile} {
    margin-bottom: var(--space-2);
  }
`;

const LoginButton = styled.button`
  margin: var(--space-1) 0;
  background-color: transparent;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

interface Props {
  isOpen: boolean;
  close: () => void;
  github: () => void;
  kakao: () => void;
  google: () => void;
}

const LoginModal = (props: Props) => {
  if (!props.isOpen) return null;

  return (
    <Modal
      close={props.close}
      title="로그인/회원가입"
      size={MODAL_SIZES.small}
      ReactModalProps={{ isOpen: props.isOpen }}
      content={
        <>
          <Content>
            <EasyLoginWrapper>
              <LoginButton onClick={props.kakao}>
                <Img src={kakaoLoginImage} alt="카카오 로그인" />
              </LoginButton>
              <LoginButton onClick={props.github}>
                <Img src={githubLoginImage} alt="깃헙 로그인" />
              </LoginButton>
              <LoginButton onClick={props.google}>
                <Img src={googleLoginImage} alt="구글 로그인" />
              </LoginButton>
            </EasyLoginWrapper>
          </Content>
        </>
      }></Modal>
  );
};

export default LoginModal;
