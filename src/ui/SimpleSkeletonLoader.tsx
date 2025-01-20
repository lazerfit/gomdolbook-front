import { keyframes, styled } from "styled-components";

const WaveLines = keyframes`
  0% {
        background-position: -468px 0;
    }
  100% {
        background-position: 468px 0;
    }
`;

const WaveSquares = keyframes`
  0% {
        background-position: -468px 0;
    }
  100% {
        background-position: 468px 0;
    }
`;

const Wrapper = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 100%;
  padding: 0 15px;
`;

const Skeleton = styled.div`
  padding: 15px;
  width: 100%;
  background-color: white;
  margin: 20px 0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 3px 3px -2px rgba(0, 0, 0, 0.2),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
`;

const Left = styled.div`
  flex: 1;
`;

const Square = styled.div`
  max-width: 150px;
  height: 80px;
  border-radius: 5px;
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
  animation: ${WaveSquares} 2s infinite ease-out;
`;

const Right = styled.div`
  flex: 3;
  padding-left: 15px;
`;

const Line = styled.div`
  width: 100%;
  height: 12px;
  margin-bottom: 6px;
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
  animation: ${WaveLines} 2s infinite ease-out;

  &:first-child {
    height: 20px;
    width: 50%;
  }

  &:nth-child(2) {
    height: 10px;
  }

  &:nth-child(3),
  &:last-child {
    width: 80%;
    height: 14px;
  }
`;

interface Props {
  $width: string;
  $n: number;
}

const SimpleSkeletonLoader = (props: Props) => {
  return (
    <Wrapper width={props.$width}>
      {Array.from({ length: props.$n }).map((_, index) => (
        <Box key={index}>
          <Skeleton>
            <Left>
              <Square />
            </Left>
            <Right>
              <Line />
              <Line />
              <Line />
              <Line />
            </Right>
          </Skeleton>
        </Box>
      ))}
    </Wrapper>
  );
};

export default SimpleSkeletonLoader;
