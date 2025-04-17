import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { createPortal } from "react-dom";

const ShowUpAnimation = keyframes`
  50% {
    bottom: 15px;
  }
`;

const ToastWrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: black;
  color: white;
  z-index: 10001;
  width: 300px;
  height: 70px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0 25px 20px -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${ShowUpAnimation} 0.5s ease;

  @media (${(props) => props.theme.breakpoints.mobile}) {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ToastIcon = styled.div`
  font-size: 24px;
  display: flex;
  margin-bottom: 2px;
  margin-right: 8px;
  color: #4ea699;
`;

interface Props {
  onShow: boolean;
  onError: boolean;
  onClose: () => void;
  message: {
    success: string;
    error: string;
  };
}

const Toast = (props: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const [toggleOnClose, setToggleOnClose] = useState(false);

  useEffect(() => {
    if (toggleOnClose) {
      setIsClosing(true);
    }
  }, [toggleOnClose]);

  const closeToast = () => {
    if (isClosing) {
      props.onClose();
    }
  };

  useEffect(
    function toastTimeout() {
      if (props.onShow) {
        const timer = setTimeout(() => setToggleOnClose(true), 3000);

        return () => clearTimeout(timer);
      } else return;
    },
    [props.onShow],
  );

  if (!props.onShow) return null;
  return createPortal(
    <ToastWrapper
      className={isClosing ? "scale-out" : "scale-in"}
      onAnimationEnd={closeToast}
    >
      <ToastIcon>
        {props.onError ? (
          <MdErrorOutline style={{ color: "red" }} />
        ) : (
          <IoIosCheckmarkCircleOutline />
        )}
      </ToastIcon>
      {props.onError ? (
        <div>{props.message.error}</div>
      ) : (
        <div>{props.message.success}</div>
      )}
    </ToastWrapper>,
    document.getElementById("modal")!,
  );
};

export default Toast;
