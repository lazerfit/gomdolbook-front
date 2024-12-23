import { styled } from "styled-components";

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

  &::before {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) => props.theme.colors.gray7};
    transition: 0.5s ease;
  }

  &:hover::before {
    width: 100%;
  }
`;

const SortBar = () => {
  return (
    <Wrapper>
      <Item>읽기 완료</Item>
      <Item>읽는 중</Item>
      <Item>읽을 예정</Item>
    </Wrapper>
  );
};

export default SortBar;
