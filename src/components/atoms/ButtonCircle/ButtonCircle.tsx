import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { motion } from 'framer-motion';

export const ButtonGroup = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  width: 4rem;
  border-radius: var(--radius-full);
  padding: var(--space-half);
  background-color: var(--background-grey);
  border: 1px solid var(--border-color-1);
  z-index: 5;
  gap: 1rem;
`;

export const StyledCircleButton = styled.button`
  ${mixins.flexCenter}
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  color: var(--primary-text);
  z-index: 5;
  font-size: 1.2rem;
`;

export const MotionCircleButton = styled(motion.button)`
  ${mixins.flexCenter}
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  color: var(--primary-text);
  z-index: 5;
  font-size: 1.2rem;
`;
