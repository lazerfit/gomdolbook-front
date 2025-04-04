import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const Item = styled.button`
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  padding: 8px 0;
  border-radius: 7px;
`;

const SortBar = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(1);
  const getSelectedButtonStyle = (isSelected: boolean) => ({
    backgroundColor: isSelected ? "black" : "transparent",
    color: isSelected ? "white" : "black",
  });
  return (
    <Wrapper>
      <Item
        style={getSelectedButtonStyle(selectedStatus === 1)}
        onClick={() => {
          setSelectedStatus(1);
          navigate("/library/reading");
        }}
      >
        읽는 중
      </Item>
      <Item
        style={getSelectedButtonStyle(selectedStatus === 2)}
        onClick={() => {
          setSelectedStatus(2);
          navigate("/library/to_read");
        }}
      >
        읽을 예정
      </Item>
      <Item
        style={getSelectedButtonStyle(selectedStatus === 3)}
        onClick={() => {
          setSelectedStatus(3);
          navigate("/library/finished");
        }}
      >
        읽기 완료
      </Item>
    </Wrapper>
  );
};

export default SortBar;
