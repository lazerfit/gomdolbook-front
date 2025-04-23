import { styled } from "styled-components";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints.js";
import { LineSkeleton, SquareSkeleton } from "@/styles/common.styled.ts";

const BookList = styled.div`
  display: flex;
  margin-top: 68px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 0;
  }
`;

const Line = styled(LineSkeleton)`
  margin-bottom: 6px;
`;

const SquareWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const Square = styled(SquareSkeleton)`
  margin-bottom: 6px;
`;

const BookListSkeletonLoader = () => {
  const { isMobile } = useMediaBreakpoints();

  if (isMobile) {
    return (
      <BookList>
        <Line $width="200px" $height="60px" />
        <Line $width="300px" $height="40px" />
        <SquareWrapper>
          <Square $width="120px" $height="170px" />
          <Square $width="120px" $height="170px" />
          <Square $width="120px" $height="170px" />
        </SquareWrapper>
      </BookList>
    );
  }

  return (
    <BookList>
      <Line $width="200px" $height="60px" />
      <Line $width="300px" $height="40px" />
      <SquareWrapper>
        <Square $width="280px" $height="410px" />
        <Square $width="280px" $height="410px" />
        <Square $width="280px" $height="410px" />
        <Square $width="280px" $height="410px" />
      </SquareWrapper>
    </BookList>
  );
};

export default BookListSkeletonLoader;
