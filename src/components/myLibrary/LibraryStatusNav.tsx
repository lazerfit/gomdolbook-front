import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 90%;
    margin-bottom: 30px;
  }
`;

const NavLink = styled.button<{ $selected: boolean }>`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  padding: 8px 0;
  border-radius: 7px;
  background-color: ${(props) => (props.$selected ? "black" : "transparent")};
  color: ${(props) => (props.$selected ? "white" : "black")};
`;

type LibraryStatus = "reading" | "to_read" | "finished";

const LibraryStatusNav = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<LibraryStatus>("reading");
  const statusOption: { label: string; status: LibraryStatus; path: string }[] = [
    { label: "읽는 중", status: "reading", path: "/library/reading" },
    { label: "읽을 예정", status: "to_read", path: "/library/to_read" },
    { label: "읽기 완료", status: "finished", path: "/library/finished" },
  ];
  const handleClickLink = (value: LibraryStatus, path: string) => {
    setSelectedStatus(value);
    navigate(path);
  };
  return (
    <NavWrapper>
      {statusOption.map((option) => (
        <NavLink
          $selected={selectedStatus === option.status}
          onClick={() => handleClickLink(option.status, option.path)}
          key={option.status}
        >
          {option.label}
        </NavLink>
      ))}
    </NavWrapper>
  );
};

export default LibraryStatusNav;
