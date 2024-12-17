import { styled } from "styled-components";
import "../styles/variables.css";

const Wrapper = styled.section`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const Library = () => {
  return (
    <>
      <Wrapper>
        <div>Library</div>
      </Wrapper>
    </>
  );
};

export default Library;
