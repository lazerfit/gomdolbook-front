import { styled } from 'styled-components';
import Modal from '@/components/templates/Modal';
import { MODAL_SIZES } from '@/utils/variables';
import { BookResponse, BookStatus } from '@/api/services/types';
import BookInfo from '@/components/molecules/BookInfo';
import VerticalFloatingButton from '@/components/molecules/VerticalFloatingButton';
import { StyledCircleButton } from '@/components/atoms/ButtonCircle';
import { Tooltip } from 'react-tooltip';
import { RiDeleteBinFill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import * as mixins from '@/styles/mixins';
import StatusButton from '@/components/molecules/StatusButton';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Wrapper = styled.div``;

const Button = styled(StyledCircleButton)`
  font-size: 1.25rem;
  color: var(--grey7);

  &:hover {
    color: var(--pink);
  }
`;

const StatusContainer = styled(motion.div)`
  width: 20rem;
  height: 5rem;
  border: 1px solid var(--grey2);
  border-radius: 5px;
  position: absolute;
  left: 2rem;
  bottom: 20rem;
  background-color: var(--grey1);
  ${mixins.flexCenter};

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    background-color: var(--grey1);
    border: 1px solid var(--grey2);
    position: absolute;
    top: -0.5rem;
    transform: rotate(45deg);
    z-index: -1;
  }
`;

interface Props {
  close: () => void;
  isOpen: boolean;
  book: BookResponse;
  status: BookStatus;
  onChangeStatus: (status: BookStatus) => void;
  onRemove: () => void;
}

const CollectionDetailModal = ({ close, isOpen, book, status, onChangeStatus, onRemove }: Props) => {
  const [statusEditMode, setStatusEditMode] = useState(false);

  return (
    <Modal
      size={MODAL_SIZES.large}
      ReactModalProps={{ isOpen }}
      close={close}
      content={
        <Wrapper>
          <BookInfo book={book} />
          <VerticalFloatingButton>
            <Button
              data-tooltip-id="remove-book-tooltip"
              data-tooltip-content="컬렉션에서 제거"
              data-tooltip-place="right"
              onClick={onRemove}>
              <RiDeleteBinFill />
            </Button>
            <Button
              data-tooltip-id="change-status-tooltip"
              data-tooltip-content="읽기 상태 변경"
              data-tooltip-place="right"
              onClick={() => setStatusEditMode(!statusEditMode)}>
              <MdEdit />
            </Button>
            <Tooltip id="change-status-tooltip" />
            <Tooltip id="remove-book-tooltip" />
          </VerticalFloatingButton>
          {statusEditMode && (
            <StatusContainer initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <StatusButton status={status} onSave={onChangeStatus} />
            </StatusContainer>
          )}
        </Wrapper>
      }
    />
  );
};

export default CollectionDetailModal;
