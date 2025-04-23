import { styled } from "styled-components";
import { LineSkeleton, SquareSkeleton } from "@/styles/common.styled.ts";

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

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  margin: 34px auto;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const LineWrapper = styled.div`
  display: flex;
  margin-top: 21px;
  flex-direction: column;
  width: 500px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const Line = styled(LineSkeleton)`
  margin-top: 8px;
`;

const Square = styled(SquareSkeleton)`
  margin: 0 auto;
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
