import { styled } from 'styled-components';
import * as mixins from '@/styles/mixins';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 3.125rem;
  ${mixins.flexCenter}
  gap: 1.25rem;
  border: 1px solid var(--border1);
  border-radius: var(--border-radius-small);
`;

const NavLink = styled(motion.button)`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 7px;
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
          whileTap={{ scale: 0.85 }}
          whileHover={{ backgroundColor: status === option.status ? 'var(--black)' : 'var(--bgc-grey)' }}
          animate={{
            backgroundColor: status === option.status ? 'var(--black)' : 'var(--whitebgc)',
            color: status === option.status ? 'var(--white)' : 'var(--black)',
          }}>
          {option.label}
        </NavLink>
      ))}
    </Wrapper>
  );
};

export default StatusNavigation;
