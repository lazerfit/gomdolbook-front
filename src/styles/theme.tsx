import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

export interface IColor {
  black: string;
  white: string;
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

export interface IFont {
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

interface ITheme {
  colors: IColor;
  fonts: IFont;
}

const theme: ITheme = {
  colors: {
    black: "#262627",
    white: "#fafafa",
    gray0: "#f8f9fa",
    gray1: "#f1f3f5",
    gray2: "#e9ecef",
    gray3: "#dee2e6",
    gray4: "#ced4da",
    gray5: "#adb5bd",
    gray6: "#868e96",
    gray7: "#495057",
    gray8: "#343a40",
    gray9: "#212529",
  },
  fonts: {
    title: "YES24",
    text: "YESGothic-Regular",
    english: "Eczar",
    size300: "0.75rem" /* 12px */,
    size400: "1rem" /* 16px */,
    size500: "1.25rem" /* 20px */,
    size600: "1.5rem" /* 24px */,
    size700: "1.75rem" /* 28px */,
    size800: "2rem" /* 32px */,
    size900: "2.25rem" /* 36px */,
  },
};

interface ThemeProps {
  children: ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
