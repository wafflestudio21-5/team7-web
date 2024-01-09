import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  // naverCafe 전체적으로 적용되는 css입니다.
  :root {
    /* font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; */
    font-family:  Malgun Gothic,'맑은 고딕',Helvetica,sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
  }
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #000;
   }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
  }
`;
export const Logo = css`
  display: block;
  background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
  background-size: 372px 326px;
  background-repeat: no-repeat;
`;
