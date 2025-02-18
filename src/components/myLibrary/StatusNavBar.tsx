import { styled } from "styled-components";
import { useState } from "react";

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
  padding: 5px 0;
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  padding: 8px;
  border-radius: 7px;
`;

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SortBar = (props: Props) => {
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
          props.setFilter("READING");
        }}
      >
        읽는 중
      </Item>
      <Item
        style={getSelectedButtonStyle(selectedStatus === 2)}
        onClick={() => {
          setSelectedStatus(2);
          props.setFilter("TO_READ");
        }}
      >
        읽을 예정
      </Item>
      <Item
        style={getSelectedButtonStyle(selectedStatus === 3)}
        onClick={() => {
          setSelectedStatus(3);
          props.setFilter("FINISHED");
        }}
      >
        읽기 완료
      </Item>
    </Wrapper>
  );
};

export default SortBar;
