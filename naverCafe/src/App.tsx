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
import CommonBoard from "./components/body/contents/CommonBoard";
import SearchBoard from "./components/body/contents/SearchBoard";
import Content from "./components/body/Content";
import Writing from "./components/Writing";
import { PaginationProvider } from "./contexts/BoardStyle/BoardBottomContext/PaginationContext";
import { useWholeBoard } from "./API/BoardAPI";
import Article from "./components/body/contents/article/Article";
import UserInfo from "./components/body/contents/userInfo/UserInfo";
import { NoticeContextProvider } from "./contexts/BoardContext/NoticeContext";
import { CurrentBoardStateProvider } from "./contexts/BoardContext/CurrentBoardContext";
import { ViewOptionStateProvider } from "./contexts/BoardContext/ViewOptionContext";
import {
  SearchContextProvider,
  useSearch,
} from "./contexts/BoardContext/SearchContext";

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;
import EditUserInfo from "./pages/EditUserInfo";
import NotDefinedPage from "./pages/404Page";
import WithdrawCafe from "./pages/WithdrawCafe";

function App() {
  const { boardList } = useWholeBoard();
  const { item } = useSearch();

  return (
    <Wrapper>
      <GlobalStyle />
      <PaginationProvider>
        <NoticeContextProvider>
          <CurrentBoardStateProvider>
            <ViewOptionStateProvider>
              <SearchContextProvider>
                <Routes>
                  {/* 회원가입 및 로그인 page */}
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />

                  {/* 유저 정보 편집 */}
                  <Route
                    path="/users/:nickname/editInfo"
                    element={<EditUserInfo />}
                  />
                  {/* 카페 탈퇴 */}
                  <Route
                    path="/users/:nickname/withdraw"
                    element={<WithdrawCafe />}
                  />

                  {/* main page 구성 */}
                  {/* Layout은 header와 body로 나뉘어져 있습니다. */}
                  {/* Body는 Layout의 body 부분으로, SearchBar, SideBar, Content, Footer로 이루어져 있습니다. */}
                  {/* Content는 총 5가지로(현재로선), HomeBoard, TotalBoard, PopularBoard, FreeBoard, SearchBoard로 이루어져 있습니다. */}
                  {/* user 개인 프로필도 Content에 표시되기에, Content에 담을 component의 수는 더 많아질 수 있습니다. */}
                  <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Body />}>
                      <Route path="/" element={<Content />}>
                        <Route Component={NotDefinedPage} path="*" />
                        <Route path="/" element={<HomeBoard />} />

                        {/* Boards */}
                        <Route path="/totalboard" element={<TotalBoard />} />
                        <Route
                          path="/popularboard"
                          element={<PopularBoard />}
                        />
                        {boardList &&
                          boardList.boards.map((board, index) => (
                            <Route
                              path={"/board/" + (index + 1)}
                              element={<CommonBoard board={board} />}
                            />
                          ))}
                        <Route
                          path="/searchboard/:keyword"
                          element={<SearchBoard />}
                          key={item}
                        />

                        {/* Article */}
                        <Route
                          path="/articles/:articleId"
                          element={<Article />}
                        />

                        {/* userInfo */}
                        <Route path="/users/:nickname" element={<UserInfo />} />
                      </Route>
                    </Route>
                    {/* 글쓰기 창은 아래 path로, Layout의 subRoute이므로 Header를 공유할 수 있습니다.*/}
                    {/* 글쓰기 창은 Footer가 없기 때문에 이렇게 만들었습니다. */}
                    {/* 글쓰기 창은 Layout의 Body(Layout 컴포넌트 상의 Outlet) 부분으로 들어가게 됩니다.*/}
                    <Route path="/write" element={<Writing />} />
                  </Route>
                </Routes>
              </SearchContextProvider>
            </ViewOptionStateProvider>
          </CurrentBoardStateProvider>
        </NoticeContextProvider>
      </PaginationProvider>
    </Wrapper>
  );
}

export default App;
