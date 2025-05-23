import { styled } from "styled-components";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints.js";
import { LineSkeleton } from "@/styles/common.styled.ts";

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 55px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 0;
  }
`;

const Line = styled(LineSkeleton)`
  margin-bottom: 6px;
`;

const BookList = styled.div`
  display: flex;
  margin-top: 68px;
  gap: 20px;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    align-items: center;
    justify-content: center;
  }
`;

const TestPage = () => {
  const { isMobile } = useMediaBreakpoints();

  if (isMobile) {
    return (
      <>
        <Banner>
          <Line $width="300px" $height="40px" />
        </Banner>
        <BookList>
          <Line $width="70px" $height="90px" />
          <Line $width="70px" $height="90px" />
          <Line $width="70px" $height="90px" />
        </BookList>
      </>
    );
  }

  return (
    <>
      <Banner>
        <Line $width="750px" $height="107px" />
        <Line $width="300px" $height="40px" style={{ marginTop: "13px" }} />
      </Banner>
      <BookList>
        <Line $width="280px" $height="410px" />
        <Line $width="280px" $height="410px" />
        <Line $width="280px" $height="410px" />
        <Line $width="280px" $height="410px" />
      </BookList>
    </>
  );
};

export default TestPage;
