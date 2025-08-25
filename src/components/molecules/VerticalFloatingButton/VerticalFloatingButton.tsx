import { styled } from 'styled-components';
import { ButtonGroup } from '@/components/atoms/ButtonCircle';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)<{ $left: string; $top: string }>`
  position: absolute;
  left: ${props => props.$left};
  top: ${props => props.$top};
`;

interface FloatingButtonProps {
  children: React.ReactNode;
  left?: string;
  top?: string;
}

const VerticalFloatingButton = ({ children, left = '10rem', top = '10rem' }: FloatingButtonProps) => {
  return (
    <Wrapper layout $left={left} $top={top}>
      <ButtonGroup>{children}</ButtonGroup>
    </Wrapper>
  );
};

export default VerticalFloatingButton;
