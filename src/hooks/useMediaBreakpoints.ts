import { useMediaQuery } from "react-responsive";

export const useMediaBreakpoints = () => {
  const isMobile: boolean = useMediaQuery({ maxWidth: 768 });

  return { isMobile };
};
