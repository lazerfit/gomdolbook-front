import "styled-components";
import type { IColor, IFont } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: IColor;
    fonts: IFont;
  }
}
