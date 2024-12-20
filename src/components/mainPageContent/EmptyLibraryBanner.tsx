import { styled, keyframes } from "styled-components";
import SearchBar from "./SearchBar";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 48px;
`;

const EmptyLibraryWrapper = styled.div`
  height: 63vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const SloganAnimation = keyframes`
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const Slogan = styled.h1`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.title}, sans-serif;
  animation: ${SloganAnimation} 2s ease-in-out;
`;

const Books = () => {
  return (
    <Wrapper>
      <EmptyLibraryWrapper>
        <Slogan>책장이 비어있다고요?</Slogan>
        <Slogan>책을 추가하여 당신의 독서 기록을 시작해보세요.</Slogan>
        <SearchBar />
      </EmptyLibraryWrapper>
    </Wrapper>
  );
};

export default Books;
