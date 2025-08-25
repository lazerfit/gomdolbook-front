import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import Modal from '@/components/templates/Modal';
import { MODAL_SIZES } from '@/utils/variables';
import Button from '@/components/atoms/Button';

const Content = styled.div`
  ${mixins.flexColumn}
  gap: 10px;
`;

const Text = styled.div``;

interface ModalProps {
  close: () => void;
  isOpen: boolean;
}

const LoginRequireModal = ({ close, isOpen }: ModalProps) => {
  return (
    <Modal
      close={close}
      size={MODAL_SIZES.small}
      ReactModalProps={{ isOpen }}
      content={
        <>
          <Content>
            <Text>로그인이 필요합니다.</Text>
            <Button>확인</Button>
          </Content>
        </>
      }
    />
  );
};

export default LoginRequireModal;
