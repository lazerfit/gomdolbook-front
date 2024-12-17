import { styled } from "styled-components";
import MainPageContent from "../components/mainPageContent/MainPageContent";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const Main = () => {
  return (
    <Wrapper>
      <MainPageContent />
    </Wrapper>
  );
};

export default Main;
