import { styled } from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)<{ $left: string; $top: string }>`
  position: absolute;
  left: ${props => props.$left};
  top: ${props => props.$top};
`;

interface HorizonalFloatingButtonProps {
  children: React.ReactNode;
  left?: string;
  top?: string;
  isChange: boolean;
}

const HorizonalFloatingButton = ({
  children,
  left = '10rem',
  top = '10rem',
  isChange,
}: HorizonalFloatingButtonProps) => {
  return (
    <Wrapper layout style={{ width: isChange ? '15rem' : '4rem' }} $left={left} $top={top}>
      {children}
    </Wrapper>
  );
};

export default HorizonalFloatingButton;
