import { useState } from "react";

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [hasToastError, setHasToastError] = useState(false);

  const openToast = () => {
    setIsToastVisible(true);
    setHasToastError(false);
  };
  const openErrorToast = () => {
    setHasToastError(true);
  };
  const closeToast = () => {
    setIsToastVisible(false);
  };

  return {
    isToastVisible,
    hasToastError,
    openToast,
    openErrorToast,
    closeToast,
  };
};
