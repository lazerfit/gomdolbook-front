import { styled } from 'styled-components';
import Modal from '@/components/templates/Modal';
import { MODAL_SIZES } from '@/utils/variables';
import { BookStatus } from '@/api/services/types';
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
import { useBook, useSaveOrUpdateStatusBook, useStatus } from '@/hooks';

const Wrapper = styled.div``;

const Button = styled(StyledCircleButton)`
  font-size: 1.25rem;
  color: var(--secondary-text);

  &:hover {
    background-color: var(--background-grey);
  }
`;

const StatusContainer = styled(motion.div)`
  width: 20rem;
  height: 5rem;
  border: 1px solid var(--grey2);
  border-radius: var(--radius-md);
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
  isbn: string;
  onRemove: () => void;
}

const CollectionDetailModal = ({ close, isOpen, isbn, onRemove }: Props) => {
  const [statusEditMode, setStatusEditMode] = useState(false);

  const { data: book, isLoading: isBookLoading } = useBook(isbn);
  const { data: currentStatus } = useStatus(isbn);
  const { handleSaveBookToLibrary } = useSaveOrUpdateStatusBook(isbn, book!, currentStatus ?? BookStatus.NEW);

  if (!book || isBookLoading) {
    return;
  }

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
              data-testid="remove-book-collection-button"
              onClick={onRemove}>
              <RiDeleteBinFill />
            </Button>
            <Button
              data-tooltip-id="change-status-tooltip"
              data-tooltip-content="읽기 상태 변경"
              data-tooltip-place="right"
              data-testid="change-status-btn"
              onClick={() => setStatusEditMode(!statusEditMode)}>
              <MdEdit />
            </Button>
            <Tooltip id="change-status-tooltip" />
            <Tooltip id="remove-book-tooltip" />
          </VerticalFloatingButton>
          {statusEditMode && (
            <StatusContainer initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
              <StatusButton status={currentStatus ?? BookStatus.NEW} onSave={handleSaveBookToLibrary} />
            </StatusContainer>
          )}
        </Wrapper>
      }
    />
  );
};

export default CollectionDetailModal;
