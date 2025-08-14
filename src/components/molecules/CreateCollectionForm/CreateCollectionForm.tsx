import { styled } from 'styled-components';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/atoms/Input';
import { MdClose } from 'react-icons/md';
import { LuPlus } from 'react-icons/lu';

const InputContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledInput = styled(Input)``;

const ButtonContainer = styled(motion.div)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Button = styled(motion.button)`
  font-size: 2.3rem;
  width: 2.3rem;
  height: 2.3rem;
  background-color: var(--white);
  border: 1px solid var(--border3);
  border-radius: var(--border-radius-small);
`;

interface Props {
  onCreate: (name: string, onSuccessCallback: () => void, event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CreateCollectionForm = ({ onCreate }: Props) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = () => {
    setIsAddMode(false);
    setInputValue('');
  };

  return (
    <AnimatePresence mode="wait">
      <ButtonContainer layout style={{ width: isAddMode ? '100%' : '50%' }}>
        {isAddMode ? (
          <InputContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledInput
              type="text"
              placeholder="컬렉션 이름을 입력해주세요..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => onCreate(inputValue, handleClose, e)}
            />
            <Button onClick={handleClose}>
              <MdClose />
            </Button>
          </InputContainer>
        ) : (
          <Button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddMode(true)}>
            <LuPlus />
          </Button>
        )}
      </ButtonContainer>
    </AnimatePresence>
  );
};

export default CreateCollectionForm;
