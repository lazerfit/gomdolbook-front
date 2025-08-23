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
  gap: 0.5rem;
`;

const SubTitle = styled.div`
  width: 100%;
  height: 2rem;
  background-color: var(--bgc-grey);
  border-radius: var(--border-radius-small);
  display: flex;
  align-items: center;
  padding: 0.5rem;
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
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0.3rem;
  background-color: transparent;
  font-size: 1.6rem;

  &:hover {
    color: var(--point);
  }
`;

interface Props {
  size: 'small' | 'big';
  title: string;
  children: React.ReactNode;
  onEditClick: () => void;
  isEditMode: boolean;
  close: () => void;
}

const ReadingLogBox = ({ size, title, children, onEditClick, isEditMode, close }: Props) => {
  return (
    <Wrapper $size={size}>
      <SubTitle>
        <div>{title}</div>
        {isEditMode ? (
          <ButtonGroup initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ConfirmButton>
              <CiCircleCheck />
            </ConfirmButton>
            <ConfirmButton onClick={close} data-testid="readingLog-confirm-button">
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
