import { useState } from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import MockupImg from "../../../assets/img/avatar-02.jpg";
import { itemVariants } from "@/ui/frameMotion/variants.ts";

const Wrapper = styled(motion.nav)`
  width: 50px;
  height: 50px;
  position: relative;
`;

const Button = styled(motion.button)``;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const UserMenu = styled(motion.ul)`
  list-style: none;
  width: 180px;
  cursor: pointer;
  border-radius: 8px;
  position: absolute;
  right: 0;
  top: 60px;
  padding: 10px;
  background-color: white;
  z-index: 1000;
  box-shadow:
    rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
`;

const Item = styled(motion.li)`
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

const UserProfile = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper initial={false} animate={isOpen ? "open" : "closed"}>
      <Button whileTap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)}>
        <Image src={MockupImg} alt="User" />
      </Button>
      <UserMenu
        animate={isOpen ? "open" : "closed"}
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
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        initial="closed"
      >
        <Item variants={itemVariants}>Profile Setting</Item>
        <Item variants={itemVariants}>My Library</Item>
        <Item variants={itemVariants} onClick={props.onLoggedOut}>
          Log out
        </Item>
      </UserMenu>
    </Wrapper>
  );
};

export default UserProfile;
