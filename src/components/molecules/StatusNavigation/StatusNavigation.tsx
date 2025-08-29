import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 3.125rem;
  ${mixins.flexCenter}
  gap: var(--space-2-5);
  border: 1px solid var(--border-color-1);
  border-radius: var(--radius-md);
`;

const NavLink = styled(motion.button)`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);

  &:disabled {
    pointer-events: none;
    color: var(--primary-text) !important;
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 10%;
  height: 2px;
  width: 80%;
  background: var(--highlight-color);
`;

interface TapOption<T> {
  label: string;
  status: T;
  path: string;
}

interface Props<T extends string> {
  statusOption: TapOption<T>[];
  status: T;
}

const StatusNavigation = <T extends string>({ statusOption, status }: Props<T>) => {
  const navigate = useNavigate();

  const handleClickLink = (path: string) => {
    navigate(path);
  };

  return (
    <Wrapper data-testid="status-tap-navigation">
      {statusOption.map(option => (
        <NavLink
          layout
          onClick={() => handleClickLink(option.path)}
          key={option.status}
          disabled={status === option.status}
          whileTap={{ scale: 0.85 }}
          whileHover={{ backgroundColor: 'var(--highlight-color)', color: 'var(--primary-text)' }}>
          {option.label}
          {status === option.status && <Underline layoutId="underline" />}
        </NavLink>
      ))}
    </Wrapper>
  );
};

export default StatusNavigation;
