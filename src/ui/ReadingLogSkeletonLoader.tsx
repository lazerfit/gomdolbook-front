import { styled } from "styled-components";
import { LineSkeleton, SquareSkeleton } from "@/styles/common.styled.ts";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints.js";

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  flex-direction: column;
`;

const Line = styled(LineSkeleton)`
  margin-top: 10px;
`;

const Square = styled(SquareSkeleton)`
  margin-top: 10px;
`;

const ReadingLogSkeletonLoader = () => {
  const { isMobile } = useMediaBreakpoints();

  if (isMobile) {
    return (
      <SkeletonContainer>
        <Line $width="390px" $height="20px" />
        <Line $width="200px" $height="20px" />
        <Square $width="100px" $height="150px" />
        <Line $width="95px" $height="20px" />
        <Line $width="70px" $height="20px" />
        <Square $width="390px" $height="300px" />
        <Square $width="390px" $height="300px" />
        <Square $width="390px" $height="300px" />
      </SkeletonContainer>
    );
  }

  return (
    <SkeletonContainer>
      <Line $width="450px" $height="20px" />
      <Line $width="300px" $height="20px" />
      <Square $width="200px" $height="300px" />
      <Line $width="105px" $height="20px" />
      <Line $width="80px" $height="30px" />
      <Square $width="600px" $height="300px" />
      <Square $width="600px" $height="300px" />
      <Square $width="600px" $height="300px" />
    </SkeletonContainer>
  );
};

export default ReadingLogSkeletonLoader;
