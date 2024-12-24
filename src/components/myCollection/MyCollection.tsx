import { styled } from "styled-components";
import MainContent from "./MainContent";

const Wrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const MyStatistic = () => {
  return (
    <Wrapper>
      <MainContent />
    </Wrapper>
  );
};

export default MyStatistic;
