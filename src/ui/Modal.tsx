import { ReactNode, useState } from "react";
import { styled } from "styled-components";
import { createPortal } from "react-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

interface IWrapper {
  $innerWidth: string;
  $innerHeight: string;
  $bgc: string;
  $color: string;
}

const Wrapper = styled.section<IWrapper>`
  position: fixed;
  width: ${(props) => props.$innerWidth};
  height: ${(props) => props.$innerHeight};
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.$bgc};
  color: ${(props) => props.$color};
  z-index: 1000;
  top: 50%;
  left: 50%;
  padding: 30px;
  border-radius: 8px;
  font-family: ${(props) => props.theme.fonts.text};
  overflow-y: auto;
`;

const CloseButton = styled.button`
  width: 20px;
  position: absolute;
  right: 20px;
  top: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 2rem;
`;

interface Props {
  children: ReactNode;
  innerWidth: string;
  innerHeight: string;
  bgc?: string;
  color?: string;
  onClose: () => void;
}

const Modal = ({
  children,
  innerHeight,
  innerWidth,
  bgc = "#fafafa",
  color = "#262627",
  onClose,
}: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const onClosing = () => {
    setIsClosing(true);
  };

  const handleOnClose = () => {
    if (isClosing) {
      if (onClose) onClose();
    }
  };

  const _onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return createPortal(
    <div>
      <Overlay onClick={onClosing} />
      <Wrapper
        className={isClosing ? "scale-out" : "scale-in"}
        tabIndex={0}
        onKeyDown={_onKeyDown}
        onAnimationEnd={handleOnClose}
        $innerWidth={innerWidth}
        $innerHeight={innerHeight}
        $bgc={bgc}
        $color={color}
      >
        <CloseButton onClick={onClosing}>&times;</CloseButton>
        {children}
      </Wrapper>
    </div>,
    document.getElementById("modal")!,
  );
};

export default Modal;
