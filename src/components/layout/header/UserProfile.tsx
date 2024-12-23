import { useState } from "react";
import { styled } from "styled-components";
import MockupImg from "../../../assets/img/avatar-02.jpg";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const UserMenu = styled.span`
  width: 180px;
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

  &::before {
    content: "";
    width: 170px;
    height: 30px;
    position: absolute;
    top: -12px;
    right: 0;
  }

  &::after {
    content: "";
    position: absolute;
    background-color: white;
    width: 10px;
    height: 10px;
    top: -5px;
    transform: rotate(45deg);
    right: 10%;
  }
`;

const Item = styled.div`
  border-bottom: 1px solid #d3d3d3;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.black};
    color: white;
  }
`;

interface Props {
  onLoggedOut: () => void;
}

const UserProfile = (props: Props) => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setIsUserMenuVisible(true)}
      onMouseLeave={() => setIsUserMenuVisible(false)}
    >
      <Image src={MockupImg} alt="User" />
      {isUserMenuVisible && (
        <UserMenu>
          <Item>Profile Setting</Item>
          <Item>My Library</Item>
          <Item style={{ border: "none" }} onClick={props.onLoggedOut}>
            Log out
          </Item>
        </UserMenu>
      )}
    </Wrapper>
  );
};

export default UserProfile;
