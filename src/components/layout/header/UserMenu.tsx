import { useState } from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { itemVariants } from "@/ui/frameMotion/variants.ts";
import { LoginButton } from "./Header.tsx";
import { useNavigate } from "react-router-dom";

const UserProfileWrapper = styled(motion.div)`
  width: 50px;
  height: 50px;
  position: relative;
`;

const DropdownMenu = styled(motion.ul)`
  list-style: none;
  width: 180px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 60px;
  padding: 10px;
  background-color: white;
  z-index: 1000;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0 15px 25px,
    rgba(0, 0, 0, 0.05) 0 5px 10px;
`;

const DropdownItem = styled(motion.li)`
  list-style: none;
  border-bottom: 1px solid #d3d3d3;
  padding: 5px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
    color: white;
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
    <UserProfileWrapper initial={false} animate={isDropdownOpened ? "open" : "closed"}>
      <LoginButton
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsDropdownOpened(!isDropdownOpened)}
      >
        menu
      </LoginButton>
      <DropdownMenu
        animate={isDropdownOpened ? "open" : "closed"}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.5,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(0% 0% 100% 100% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isDropdownOpened ? "auto" : "none" }}
        initial="closed"
      >
        <DropdownItem
          variants={itemVariants}
          onClick={() => onNavigate("/library/reading")}
        >
          My Library
        </DropdownItem>
        <DropdownItem variants={itemVariants} onClick={() => onNavigate("/collections")}>
          My Collection
        </DropdownItem>
        <DropdownItem variants={itemVariants} onClick={props.onLoggedOut}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </UserProfileWrapper>
  );
};

export default UserMenu;
