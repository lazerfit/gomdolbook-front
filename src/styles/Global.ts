import {createGlobalStyle} from 'styled-components'
import './variables.css'

const GlobalStyle = createGlobalStyle`
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
    font-family: "Gothic A1", sans-serif;
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
  .title-lg {
    font-size: 48px;
    font-weight: 600;
    line-height: 120%;
  }

  .title-md {
    font-size: 36px;
    font-weight: 600;
    line-height: 120%;
  }

  .title-sm {
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
`

export default GlobalStyle
