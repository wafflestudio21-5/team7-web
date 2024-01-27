import styled from "styled-components";
import { GlobalStyle } from "./contexts/StyleContext";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";

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
import { useState } from "react";
import { NoticeContextProvider } from "./contexts/BoardContext/NoticeContext";
import { CurrentBoardStateProvider } from "./contexts/BoardContext/CurrentBoardContext";
import { ViewOptionStateProvider } from "./contexts/BoardContext/ViewOptionContext";
import {
  NickModalContext,
  NickModalContextProvider,
} from "./contexts/BoardContext/nickNameModalContext";

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

function App() {
  const { boardList } = useWholeBoard();

  // myUsername은 login할 때의 username입니다. login시 바뀝니다.
  // -> 지금은 login 시 바뀌지만, 자신의 정보를 얻어오는 api가 추가된다면, 그 api에서 받아온 response를 기반으로 바꿀 생각입니다.
  // 자신의 정보를 얻어오는 api에는 (아마도) id, username, name, nickname 정보를 받을 수 있을 텐데, 그 api가 완성되면 이 세 가지 정보를 담은 객체를 context value로 전달하도록 수정할 것 같습니다.
  const [myUsername, setMyUsername] = useState<string>("");

  // accessToken은 말 그대로 access token입니다. login 시 할당됩니다.
  // 현재 로그인되어있는지 여부는 (myUsername !== "") 으로 알아보는 것으로 하겠습니다.
  const [accessToken, setAccessToken] = useState<string>("");
  console.log("myUsername:" + myUsername);
  return (
    <Wrapper>
      <AuthContext.Provider
        value={{ myUsername: myUsername, accessToken: accessToken }}
      >
        <GlobalStyle />
        <PaginationProvider>
          <NoticeContextProvider>
            <CurrentBoardStateProvider>
              <ViewOptionStateProvider>
                <NickModalContextProvider>
                  <Routes>
                    {/* 회원가입 및 로그인 page */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                      path="/login"
                      element={
                        <Login
                          setMyUsername={setMyUsername}
                          setAccessToken={setAccessToken}
                        />
                      }
                    />

                    {/* main page 구성 */}
                    {/* Layout은 header와 body로 나뉘어져 있습니다. */}
                    {/* Body는 Layout의 body 부분으로, SearchBar, SideBar, Content, Footer로 이루어져 있습니다. */}
                    {/* Content는 총 5가지로(현재로선), HomeBoard, TotalBoard, PopularBoard, FreeBoard, SearchBoard로 이루어져 있습니다. */}
                    {/* user 개인 프로필도 Content에 표시되기에, Content에 담을 component의 수는 더 많아질 수 있습니다. */}

                    <Route path="/" element={<Layout />}>
                      <Route path="/" element={<Body />}>
                        <Route path="/" element={<Content />}>
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
                                path={"/board/" + index}
                                element={<CommonBoard board={board} />}
                              />
                            ))}
                          <Route
                            path="/searchboard/:keyword"
                            element={<SearchBoard />}
                          />

                          {/* Article */}
                          <Route
                            path="/articles/:articleId"
                            element={<Article />}
                          />

                          {/* userInfo */}
                          <Route path="/users/:id" element={<UserInfo />} />
                        </Route>
                      </Route>
                      {/* 글쓰기 창은 아래 path로, Layout의 subRoute이므로 Header를 공유할 수 있습니다.*/}
                      {/* 글쓰기 창은 Footer가 없기 때문에 이렇게 만들었습니다. */}
                      {/* 글쓰기 창은 Layout의 Body(Layout 컴포넌트 상의 Outlet) 부분으로 들어가게 됩니다.*/}
                      <Route path="/write" element={<Writing />} />
                    </Route>
                  </Routes>
                </NickModalContextProvider>
              </ViewOptionStateProvider>
            </CurrentBoardStateProvider>
          </NoticeContextProvider>
        </PaginationProvider>
      </AuthContext.Provider>
    </Wrapper>
  );
}

export default App;
