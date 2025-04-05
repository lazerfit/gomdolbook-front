import { styled, keyframes } from "styled-components";

const Wave = keyframes`
  0% {
        background-position: -468px 0;
    }
  100% {
        background-position: 468px 0;
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 34px auto;
  padding: 21px;
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 34px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  margin: 34px auto;
`;

const LineWrapper = styled.div`
  display: flex;
  margin-top: 21px;
  flex-direction: column;
  width: 500px;
`;

const Line = styled.div<{ $width: string; $height: string }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin-top: 8px;
  border-radius: 2px;
  background: rgba(130, 130, 130, 0.2);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(8%, rgba(130, 130, 130, 0.2)),
    color-stop(18%, rgba(130, 130, 130, 0.3)),
    color-stop(33%, rgba(130, 130, 130, 0.2))
  );
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: ${Wave} 2s infinite ease-out;
`;

const Square = styled.div<{ $width: string; $height: string }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: 0 auto;
  border-radius: 9px;
  background: rgba(130, 130, 130, 0.2);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(8%, rgba(130, 130, 130, 0.2)),
    color-stop(18%, rgba(130, 130, 130, 0.3)),
    color-stop(33%, rgba(130, 130, 130, 0.2))
  );
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: ${Wave} 2s infinite ease-out;
`;

const BookDetailSkeletonLoader = () => {
  return (
    <Wrapper>
      <Square $width="150px" $height="226px" />
      <Box>
        <Line $width="70%" $height="30px" />
        <Line $width="50%" $height="20px" />
        <LineWrapper>
          <Line $width="20%" $height="20px" />
          <Line $width="100%" $height="16px" />
          <Line $width="100%" $height="16px" />
          <Line $width="20%" $height="20px" style={{ marginTop: "21px" }} />
          <Line $width="100%" $height="16px" />
          <Line $width="100%" $height="16px" />
        </LineWrapper>
        <ButtonWrapper>
          {Array.from({ length: 3 }).map((_, index) => (
            <Square $width="100px" $height="48px" key={index} />
          ))}
        </ButtonWrapper>
      </Box>
    </Wrapper>
  );
};

export default BookDetailSkeletonLoader;
