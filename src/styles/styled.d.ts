import "styled-components";

interface IColor {
  black: string;
  white: string;
  bgc: string;
  gray0: string;
  gray1: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
  gray6: string;
  gray7: string;
  gray8: string;
  gray9: string;
}

interface IFont {
  title: string;
  text: string;
  english: string;
  size300: string;
  size400: string;
  size500: string;
  size600: string;
  size700: string;
  size800: string;
  size900: string;
}

interface IShadow {
  light: string;
  text: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: IColor;
    fonts: IFont;
    shadow: IShadow;
  }
}
