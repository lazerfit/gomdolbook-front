import { css, styled } from 'styled-components';
import { CommonBox } from '@/components/atoms/Box/Box';
import { FaRegEdit } from 'react-icons/fa';
import { CiCircleRemove, CiCircleCheck } from 'react-icons/ci';
import { motion } from 'framer-motion';

const small = css`
  width: 25rem;
  height: 15rem;
`;

const big = css`
  width: 52rem;
  min-height: 55rem;
`;

const Wrapper = styled(CommonBox)<{ $size: 'small' | 'big' }>`
  ${props => (props.$size === 'small' ? small : big)}
  align-items: center;
  flex-direction: column;
  gap: var(--space-1);
`;

const SubTitle = styled.div`
  width: 100%;
  height: 2rem;
  background-color: var(--background-grey);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  padding: var(--space-1);
  justify-content: space-between;
`;

const EditButton = styled(motion.button)`
  width: 2rem;
  height: 2rem;
  font-size: 1.3rem;
  background-color: transparent;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: var(--space-half);
  align-items: center;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  width: 2rem;
  height: 2rem;
  padding: var(--space-half);
  background-color: transparent;
  font-size: 1.6rem;

  &:hover {
    color: var(--accent-color);
  }
`;

interface Props {
  size: 'small' | 'big';
  title: string;
  children: React.ReactNode;
  onEditClick: () => void;
  onSaveClick: () => void;
  isEditMode: boolean;
  close: () => void;
}

const ReadingLogBox = ({ size, title, children, onSaveClick, onEditClick, isEditMode, close }: Props) => {
  return (
    <Wrapper $size={size}>
      <SubTitle>
        <h5>{title}</h5>
        {isEditMode ? (
          <ButtonGroup initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ConfirmButton onClick={onSaveClick} data-testid="readingLog-confirm-button">
              <CiCircleCheck />
            </ConfirmButton>
            <ConfirmButton onClick={close} data-testid="readingLog-remove-button">
              <CiCircleRemove />
            </ConfirmButton>
          </ButtonGroup>
        ) : (
          <EditButton
            onClick={onEditClick}
            aria-label="edit"
            title="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-testid="readingLog-edit-button"
            transition={{ duration: 0.5 }}>
            <FaRegEdit />
          </EditButton>
        )}
      </SubTitle>
      {children}
    </Wrapper>
  );
};

export default ReadingLogBox;
