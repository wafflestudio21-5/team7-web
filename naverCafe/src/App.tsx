import styled from "styled-components";
import { GlobalStyle } from "./contexts/StyleContext";
import { Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Body from "./components/Body";
import HomeBoard from "./components/body/contents/HomeBoard";
import TotalBoard from "./components/body/contents/TotalBoard";
import PopularBoard from "./components/body/contents/PopularBoard";
import FreeBoard from "./components/body/contents/FreeBoard";
import SearchBoard from "./components/body/contents/SearchBoard";
import Content from "./components/body/Content";

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Routes>
        {/* 회원가입 및 로그인 page */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* main page 구성 */}
        {/* Layout은 header와 body로 나뉘어져 있습니다. */}
        {/* Body는 Layout의 body 부분으로, SearchBar, SideBar, Content, Footer로 이루어져 있습니다. */}
        {/* Content는 총 5가지로(현재로선), HomeBoard, TotalBoard, PopularBoard, FreeBoard, SearchBoard로 이루어져 있습니다. */}
        {/* user 개인 프로필도 Content에 표시되기에, Content에 담을 component의 수는 더 많아질 수 있습니다. */}

        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Content />}>
              <Route path="/" element={<HomeBoard />} />
              <Route path="/totalboard" element={<TotalBoard />} />
              <Route path="/popularboard" element={<PopularBoard />} />
              <Route path="/freeboard" element={<FreeBoard />} />
              <Route path="/searchboard/:keyword" element={<SearchBoard />} />
            </Route>
          </Route>

          {/* 글쓰기 창은 아래 path로, Layout의 subRoute이므로 Header를 공유할 수 있습니다.*/}
          {/* 글쓰기 창은 Footer가 없기 때문에 이렇게 만들었습니다. */}
          {/* 글쓰기 창은 Layout의 Body(Layout 컴포넌트 상의 Outlet) 부분으로 들어가게 됩니다.*/}
          <Route path="/write" />
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
