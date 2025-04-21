import { useCallback, useState } from "react";

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [hasToastError, setHasToastError] = useState(false);

  const openToast = useCallback<() => void>(() => {
    setIsToastVisible(true);
    setHasToastError(false);
  }, []);

  const openErrorToast = useCallback<() => void>(() => {
    setIsToastVisible(true);
    setHasToastError(true);
  }, []);

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
