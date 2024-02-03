import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  width: 860px;

  min-height: 1385.5px;
  background-color: #fff;
  color: #333;

`;
const Content = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
export default Content;
