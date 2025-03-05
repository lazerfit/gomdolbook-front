import { useState } from "react";

export const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isErrorToast, setIsErrorToast] = useState(false);

  const onShowToast = () => {
    setIsToastVisible(true);
    setIsErrorToast(false);
  };
  const onShowErrorToast = () => {
    setIsErrorToast(true);
  };
  const onCloseToast = () => {
    setIsToastVisible(false);
  };

  return { isToastVisible, isErrorToast, onShowToast, onShowErrorToast, onCloseToast };
};
