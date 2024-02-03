import SearchBar from "./body/SearchBar";
import SideBar from "./body/SideBar";
import Footer from "./body/Footer";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  width: 1080px;
  /* background-color: beige; */
  .grid {
    display: grid;
    grid-template-columns: 200px 860px;
    column-gap: 20px;
  }
`;
const Body = () => {
  return (
    <Wrapper>
      <SearchBar />
      <div className="grid">
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </Wrapper>
  );
};
export default Body;
