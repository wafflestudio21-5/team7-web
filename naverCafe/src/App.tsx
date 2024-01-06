import styled from "styled-components";
import SignUp from "./pages/SignUp";
import { GlobalStyle } from "./contexts/CssContext";

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Wrapper>
        <SignUp />
      </Wrapper>
    </>
  );
}

export default App;
