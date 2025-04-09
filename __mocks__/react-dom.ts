import * as reactDom from "react-dom";
import { ReactNode } from "react";

export const createPortal = (node: ReactNode) => node;
export default {
  ...reactDom,
  createPortal,
};
