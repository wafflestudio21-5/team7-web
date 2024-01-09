import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  width: 860px;
  height: 1385.5px;
  background-color: bisque;
`;
const Content = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
export default Content;
