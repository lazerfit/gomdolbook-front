import { ReactNode } from "react";
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
  innerWidth: string;
  innerHeight: string;
}

const Wrapper = styled.section<IWrapper>`
  position: absolute;
  width: ${(props) => props.innerWidth};
  height: ${(props) => props.innerHeight};
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.white};
  z-index: 1000;
  top: 50%;
  left: 50%;
  padding: 30px;
  border-radius: 8px;
  font-family: ${(props) => props.theme.fonts.text};
`;

interface Props {
  children: ReactNode;
  innerWidth: string;
  innerHeight: string;
  onClose: () => void;
}

const Modal = (props: Props) => {
  const _onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      props.onClose();
    }
  };

  return createPortal(
    <>
      <Overlay onClick={props.onClose} />
      <Wrapper
        className="scale-in"
        tabIndex={0}
        onKeyDown={_onKeyDown}
        innerWidth={props.innerWidth}
        innerHeight={props.innerHeight}
      >
        {props.children}
      </Wrapper>
    </>,
    document.getElementById("modal")!,
  );
};

export default Modal;
