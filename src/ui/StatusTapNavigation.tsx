import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 90%;
    margin: 0 auto 30px auto;
  }
`;

const NavLink = styled(motion.button)<{ $selected: boolean }>`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  padding: 8px 5px;
  border-radius: 7px;
  background-color: ${(props) => (props.$selected ? "black" : "transparent")};
  color: ${(props) => (props.$selected ? "white" : "black")};
`;

interface TapOption<T> {
  label: string;
  status: T;
  path: string;
}

interface Props<T extends string> {
  statusOption: TapOption<T>[];
  initialStatus: T;
}

const StatusTapNavigation = <T extends string>({
  statusOption,
  initialStatus,
}: Props<T>) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const handleClickLink = (value: T, path: string) => {
    setSelectedStatus(value);
    navigate(path);
  };

  return (
    <NavWrapper data-testid="status-tap-navigation">
      {statusOption.map((option) => (
        <NavLink
          $selected={selectedStatus === option.status}
          onClick={() => handleClickLink(option.status, option.path)}
          key={option.status}
          whileTap={{ scale: 0.85 }}
        >
          {option.label}
        </NavLink>
      ))}
    </NavWrapper>
  );
};

export default StatusTapNavigation;
