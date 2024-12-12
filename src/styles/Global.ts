import {createGlobalStyle} from 'styled-components'
import './variables.css'

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'YESGothic-Regular';
      src: url('https://cdn.jsdelivr.net/gh/fontbee/font@main/Yes24/YESGothic-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }

  @font-face {
    font-family: 'YES24';
    src: url('https://cdn.jsdelivr.net/gh/fontbee/font@main/Yes24/YES24.woff') format('woff');
    font-weight: normal;
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

  body {
    font-size: 16px;
    color: var(--text-color);
    line-height: 140%;
    letter-spacing: -0.3px;
    font-family: 'YESGothic-Regular';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-color);
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
    font-size: 48px;
    font-weight: 600;
    line-height: 120%;
  }

  h2 {
    font-size: 36px;
    font-weight: 600;
    line-height: 120%;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    line-height: 130%;
  }

  .text-lg {
    font-size: 18px;
    font-weight: 600;
    line-height: 140%;
  }

  .text-md {
    font-size: 16px;
    line-height: 140%;
  }

  .text-sm {
    font-size: 14px;
    line-height: 140%;
  }

  .caption {
    font-size: 12px;
    line-height: 140%;
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

  .scale-in {
    animation: ScaleIn 0.5s ease-in-out;
  }

  .scale-out {
    animation: ScaleIn 0.5s reverse;
  }
`

export default GlobalStyle
