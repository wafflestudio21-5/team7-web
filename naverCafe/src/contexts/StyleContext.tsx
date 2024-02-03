import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  // naverCafe 전체적으로 적용되는 css입니다.
  :root {
    /* font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; */
    font-family: Apple SD Gothic Neo, 애플 SD 산돌고딕 Neo, 나눔 고딕, NanumGothic, Helvetica,sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light only; //다크 모드 안되게
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    //-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow-x:hidden;
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
  @media (prefers-color-scheme: dark) {
  body {
    background-color: white;
    color: #213547;
    /* 기타 다크 모드에서 변경할 스타일 */
  }
}

`;
export const Logo = css`
  display: block;
  background-image: url(https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png);
  background-size: 372px 326px;
  background-repeat: no-repeat;
`;
