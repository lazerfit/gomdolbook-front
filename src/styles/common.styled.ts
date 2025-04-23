import { keyframes, styled } from "styled-components";

export const ButtonMd = styled.button`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: 1rem;
  font-weight: 500;
  line-height: 30px;
  padding: 7px ${(props) => props.theme.fonts.size500};
  background-color: ${(props) => props.theme.colors.black};
  border-radius: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
`;

export const WaveLines = keyframes`
  0% {
        background-position: -468px 0;
    }
  100% {
        background-position: 468px 0;
    }
`;

export const LineSkeleton = styled.div<{ $width: string; $height: string }>`
  width: ${(prop) => prop.$width};
  height: ${(prop) => prop.$height};
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

  @media (${(props) => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const SquareSkeleton = styled.div<{ $width: string; $height: string }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  margin: 0 auto;
  border-radius: 9px;
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
