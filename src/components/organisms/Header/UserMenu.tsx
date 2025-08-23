import { useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { itemVariants } from '@/ui/frameMotion/variants';
import { LoginButton } from './Header';
import { useNavigate } from 'react-router-dom';

const UserProfileWrapper = styled(motion.div)`
  padding: 1.375rem 0;
  width: 5.32rem;
  height: 5.625rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const DropdownMenu = styled(motion.ul)`
  list-style: none;
  width: 6.25rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 4.375rem;
  padding: 0.625rem;
  background-color: var(--white);
  z-index: 1000;
  border-radius: var(--border-radius-small);
  box-shadow:
    rgba(0, 0, 0, 0.15) 0 15px 25px,
    rgba(0, 0, 0, 0.05) 0 5px 10px;
`;

const DropdownItem = styled(motion.li)`
  list-style: none;
  padding: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: var(--bgc-grey);
    border-radius: var(--border-radius-small);
  }
`;

interface Props {
  onLoggedOut: () => void;
}

const UserMenu = (props: Props) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const navigate = useNavigate();
  const onNavigate = (url: string) => {
    navigate(url);
    setIsDropdownOpened(false);
  };

  return (
    <UserProfileWrapper initial={false} animate={isDropdownOpened ? 'open' : 'closed'}>
      <LoginButton whileTap={{ scale: 0.9 }} onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
        menu
      </LoginButton>
      <DropdownMenu
        animate={isDropdownOpened ? 'open' : 'closed'}
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.5,
              delayChildren: 0.3,
            },
          },
          closed: {
            clipPath: 'inset(0% 0% 100% 100% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isDropdownOpened ? 'auto' : 'none' }}
        initial="closed">
        <DropdownItem variants={itemVariants} onClick={() => onNavigate('/library/READING')}>
          Library
        </DropdownItem>
        <DropdownItem variants={itemVariants} onClick={() => onNavigate('/collections')}>
          Collection
        </DropdownItem>
        <DropdownItem variants={itemVariants} onClick={props.onLoggedOut}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </UserProfileWrapper>
  );
};

export default UserMenu;
