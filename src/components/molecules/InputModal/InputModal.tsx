import { styled } from 'styled-components';
import Button from '@/components/atoms/Button';
import { MODAL_SIZES } from '@/utils/variables';
import Modal from '@/components/templates/Modal';
import Input from '@/components/atoms/Input';

const StyledInput = styled(Input)``;

const ConfirmButtonContainer = styled.div`
  justify-content: center;
  margin-top: var(--space-2);
  display: flex;
  align-items: center;
  gap: var(--space-1);
`;

interface InputModalProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isOpen: boolean;
  close: () => void;
  onSuccess: () => void;
}

const InputModal = ({ isOpen, close, onSuccess, ...props }: InputModalProps) => {
  return (
    <Modal
      close={close}
      content={
        <>
          <StyledInput type="text" placeholder="새 컬렉션 이름을 입력해주세요." {...props} />
          <ConfirmButtonContainer>
            <Button size="medium" variant={'primary'} onClick={onSuccess}>
              확인
            </Button>
            <Button size="medium" onClick={close}>
              취소
            </Button>
          </ConfirmButtonContainer>
        </>
      }
      size={MODAL_SIZES.small}
      ReactModalProps={{ isOpen }}
    />
  );
};

export default InputModal;
