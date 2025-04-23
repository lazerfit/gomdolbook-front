import { styled } from "styled-components";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints.ts";
import { LineSkeleton, SquareSkeleton } from "@/styles/common.styled.ts";

const BookList = styled.div`
  display: flex;
  margin-top: 68px;
  gap: 20px;
  width: 100%;
  flex-wrap: wrap;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 30px;
  }
`;

const Book = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin: auto;
  }
`;

const Square = styled(SquareSkeleton)`
  margin-bottom: 6px;
`;

const Line = styled(LineSkeleton)`
  margin-bottom: 6px;
`;

const CollectionSkeletonLoader = () => {
  const { isMobile } = useMediaBreakpoints();

  if (isMobile) {
    return (
      <BookList data-testid="skeleton">
        {Array.from({ length: 3 }).map((_, index) => (
          <Book key={index}>
            <Square $width="350px" $height="120px" />
          </Book>
        ))}
      </BookList>
    );
  }

  return (
    <BookList data-testid="skeleton">
      {Array.from({ length: 4 }).map((_, index) => (
        <Book key={index}>
          <Square $width="280px" $height="280px" />
          <Line $width="50px" $height="12px" />
        </Book>
      ))}
    </BookList>
  );
};

export default CollectionSkeletonLoader;
