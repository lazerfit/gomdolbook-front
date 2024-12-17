import { styled } from "styled-components";

const Wrapper = styled.div`
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
`;

const Statistics = () => {
  return (
    <>
      <Wrapper>
        <div>Statistics</div>
      </Wrapper>
    </>
  );
};

export default Statistics;
