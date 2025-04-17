import { styled, keyframes } from "styled-components";
import { useMediaBreakpoints } from "@/hooks/useMediaBreakpoints.js";

const WaveLines = keyframes`
  0% {
        background-position: -468px 0;
    }
  100% {
        background-position: 468px 0;
    }
`;

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

const Line = styled.div<{ $width: string; $height: string }>`
  width: ${(prop) => prop.$width};
  height: ${(prop) => prop.$height};
  margin-bottom: 6px;
  border-radius: 2px;
  background: rgba(130, 130, 130, 0.2);
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: ${WaveLines} 2s infinite ease-out;
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
