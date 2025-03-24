import { ReactNode } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import "./styled.d.ts";

const theme: DefaultTheme = {
  colors: {
    black: "#262627",
    white: "#fafafa",
    bgc: "#ebebeb",
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
    title: "Gyeonggi_Batang_Regular",
    text: "NanumSquareNeo-Variable",
    english: "Barlow Condensed",
    size300: "0.75rem" /* 12px */,
    size400: "1rem" /* 16px */,
    size500: "1.25rem" /* 20px */,
    size600: "1.5rem" /* 24px */,
    size700: "1.75rem" /* 28px */,
    size800: "2rem" /* 32px */,
    size900: "2.25rem" /* 36px */,
  },
  shadow: {
    light: `
      0px 2px 0px 0px rgba(186, 186, 186, 0.4),
    2px 1px 0px 0px rgba(186, 186, 186, 0.35),
    2px 4px 0px 0px rgba(186, 186, 186, 0.35),
    4px 2px 0px 0px rgba(186, 186, 186, 0.3),
    4px 6px 0px 0px rgba(186, 186, 186, 0.25),
    6px 4px 0px 0px rgba(186, 186, 186, 0.25),
    6px 8px 0px 0px rgba(186, 186, 186, 0.2),
    8px 6px 0px 0px rgba(186, 186, 186, 0.2),
    8px 10px 0px 0px rgba(186, 186, 186, 0.2),
    10px 8px 0px 0px rgba(186, 186, 186, 0.15),
    10px 12px 0px 0px rgba(186, 186, 186, 0.15),
    12px 10px 0px 0px rgba(186, 186, 186, 0.12),
    12px 14px 0px 0px rgba(186, 186, 186, 0.12),
    14px 10px 0px 0px rgba(186, 186, 186, 0.08),
    14px 16px 0px 0px rgba(186, 186, 186, 0.07),
    16px 14px 0px 0px rgba(186, 186, 186, 0.06),
    16px 18px 0px 0px rgba(186, 186, 186, 0.05),
    18px 16px 0px 0px rgba(186, 186, 186, 0.04),
    18px 20px 0px 0px rgba(186, 186, 186, 0.03),
    20px 16px 0px 0px rgba(186, 186, 186, 0.02),
    20px 24px 0px 0px rgba(186, 186, 186, 0.01),
    24px 20px 0px 0px rgba(186, 186, 186, 0.01),
    24px 28px 0px 0px rgba(186, 186, 186, 0.01)
    `,
    text: `0px 2px rgba(186, 186, 186, 0.4),
    2px 1px rgba(186, 186, 186, 0.35),
    2px 4px rgba(186, 186, 186, 0.35),
    4px 2px rgba(186, 186, 186, 0.3),
    4px 6px rgba(186, 186, 186, 0.25),
    6px 4px rgba(186, 186, 186, 0.25),
    6px 8px rgba(186, 186, 186, 0.2),
    8px 6px rgba(186, 186, 186, 0.2),
    8px 10px rgba(186, 186, 186, 0.2),
    10px 8px rgba(186, 186, 186, 0.15),
    10px 12px rgba(186, 186, 186, 0.15),
    12px 10px rgba(186, 186, 186, 0.12),
    12px 14px rgba(186, 186, 186, 0.12),
    14px 10px rgba(186, 186, 186, 0.08),
    14px 16px rgba(186, 186, 186, 0.07),
    16px 14px rgba(186, 186, 186, 0.06),
    16px 18px rgba(186, 186, 186, 0.05),
    18px 16px rgba(186, 186, 186, 0.04),
    18px 20px rgba(186, 186, 186, 0.03),
    20px 16px rgba(186, 186, 186, 0.02),
    20px 24px rgba(186, 186, 186, 0.01),
    24px 20px rgba(186, 186, 186, 0.01),
    24px 28px rgba(186, 186, 186, 0.01)`,
  },
};

interface ThemeProps {
  children: ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
