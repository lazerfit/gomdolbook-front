import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Cafe24Decoschool';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Decoschool.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gyeonggi_Batang_Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2410-3@1.0/Batang_Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    background-color: transparent;
  }

  #root {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  body {
    font-size: 100%;
    color: ${(props) => props.theme.colors.black};
    line-height: 140%;
    letter-spacing: -0.3px;
    font-family: ${(props) => props.theme.fonts.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.bgc};
    max-width: 1180px;
    margin: 0 auto;
    height: 100%;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      max-width: ${(props) => props.theme.breakpoints.mobile};
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  pre {
    white-space: pre-wrap;
  }

  /* font-size */
  h1 {
    font-size: 3rem;
    font-weight: 600;
    line-height: 120%;
  }

  h2 {
    font-size: ${(props) => props.theme.fonts.size900};
    font-weight: 600;
    line-height: 120%;
  }

  h3 {
    font-size: ${(props) => props.theme.fonts.size600};
    font-weight: 600;
    line-height: 130%;
  }

  /* Animation */
  @keyframes ScaleIn {
    0% {
    transform: translate(-50%, -50%) scale(0);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  }

  @keyframes ScaleOut {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  }

  .scale-in {
    animation: ScaleIn 0.4s ease-in-out forwards;
  }

  .scale-out {
    animation: ScaleOut 0.4s ease-in-out forwards;
  }
`;

export default GlobalStyle;
