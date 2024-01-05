import styled from "styled-components";
import Login from "./pages/Login";

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

function App() {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
}

export default App;
