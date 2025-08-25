import { css } from 'styled-components';

/** Fonts */
export const title = css`
  height: 32px;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.25px;
  color: inherit;
`;

export const common = css`
  font-family: 'NanumSquareNeo-Variable', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const small = css`
  ${common};
  font-size: 12px;
  line-height: normal;
`;

export const normal = css`
  ${common};
  font-size: 14px;
  line-height: 1.43;
`;

export const midBig = css`
  ${common};
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;

export const big = css`
  height: 32px;
  font-size: 24px;
  line-height: 1.33;
  letter-spacing: -0.25px;
`;

export const heavy = css`
  font-weight: 500;
`;

export const demi = css`
  font-weight: 600;
`;

export const fontFamilyEnglish = css`
  font-family: 'Archivo', serif;
`;

export const fontFamilyTitle = css`
  font-family: 'Gyeonggi_Batang_Regular', sans-serif;
`;
