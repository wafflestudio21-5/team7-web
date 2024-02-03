import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
`;
const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};
export default Layout;
