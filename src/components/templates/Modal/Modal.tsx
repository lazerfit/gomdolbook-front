import { styled } from 'styled-components';
import ReactModal from 'react-modal';
import * as mixins from '@/styles/mixins';
import { demi, midBig } from '@/styles/fonts';
import { IoMdCloseCircle } from 'react-icons/io';
import { MODAL_SIZES } from '@/utils/variables';
import { useState } from 'react';
import { motion } from 'framer-motion';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(4px)',
    zIndex: 2000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--background-light)',
    borderRadius: '5px',
    boxShadow:
      '0 6px 10px -5px rgba(33, 34, 66, 0.04),0 6px 30px 5px rgba(33, 34, 66, 0.08),0 16px 24px 2px rgba(33, 34, 66, 0.12)',
  },
};

const Wrapper = styled(motion.div)<{ $size: MODAL_SIZES }>`
  ${mixins.flexCenter};
  flex-direction: column;
  justify-content: space-around;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  position: relative;
  ${props => {
    switch (props.$size) {
      case MODAL_SIZES.small:
        return mixins.modalSmall;
      case MODAL_SIZES.normal:
        return mixins.modalNormal;
      case MODAL_SIZES.large:
        return mixins.modalLarge;
      default:
        return mixins.modalSmall;
    }
  }};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 18px;
`;

const Title = styled.div`
  ${midBig};
  ${demi};
`;

const Content = styled.div``;

const Close = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  font-size: 1.5rem;
  ${mixins.flexCenter};
  transition: color 0.25s;

  &:hover {
    color: var(--highlight-color);
  }
`;

interface Props {
  close: () => void;
  title?: string;
  content: React.ReactElement;
  size: MODAL_SIZES;
  ReactModalProps: ReactModal.Props;
}

ReactModal.setAppElement('#root');
const Modal = ({ close, title = '', content, size, ReactModalProps }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      close();
      setIsClosing(false);
    }
  };

  return (
    <ReactModal style={customStyles} onRequestClose={handleClose} shouldCloseOnOverlayClick {...ReactModalProps}>
      <Wrapper $size={size} className={isClosing ? 'scale-out' : 'scale-in'} onAnimationEnd={handleAnimationEnd}>
        <Header>
          <Title>{title}</Title>
          <Close onClick={handleClose} aria-label="Close modal" data-testid="modal-close-button">
            <IoMdCloseCircle />
          </Close>
        </Header>
        <Content>{content}</Content>
      </Wrapper>
    </ReactModal>
  );
};

export default Modal;
