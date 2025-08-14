import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { motion } from 'framer-motion';

export const ButtonGroup = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  width: 4rem;
  border-radius: var(--border-radius-big);
  padding: 0.5rem;
  background-color: var(--bgc-grey);
  border: 1px solid var(--border1);
  z-index: 5;
  gap: 1rem;
`;

export const StyledCircleButton = styled.button`
  ${mixins.flexCenter}
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  color: var(--black);
  z-index: 5;
  font-size: 1.2rem;
`;

export const MotionCircleButton = styled(motion.button)`
  ${mixins.flexCenter}
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  color: var(--black);
  z-index: 5;
  font-size: 1.2rem;
`;
