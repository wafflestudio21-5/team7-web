import styled from "styled-components";

import UserLikedArticle from "./UserLikedArticle";
import UserBottomButtons from "./UserBottomButtons";
import UserInfoPaginationBox from "./UserInfoPaginationBox";

import { useState } from "react";

const Wrapper = styled.div``;
const Header = styled.div`
  display: grid;
  height: 40px;
  grid-template-columns: 660px 120px 80px;
  & > div {
    display: flex;
    padding: 2px;
    box-sizing: border-box;
    color: #4e4e4e;
    font-size: 13px;
    font-weight: 700;
    justify-content: center;
    align-items: center;
  }
`;
const UserArticleBox = styled.div``;

const exampleUserLikedArticles = {
  articles: [
    {
      id: 1,
      content: "게시물에 들어있는 내용이요!.",
      last_modified: "2024-01-14T12:30:45",
      title: "안녕하세요(제목입니다.)",
      viewCount: 4,
      commentCount: 5,
    },
  ],
};

interface PropsUserLikedArticleList {
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
}

const UserLikedArticleList = ({ userInfo }: PropsUserLikedArticleList) => {
  const [checkedLikedArticleIdList, setCheckedLikedArticleIdList] = useState<
    number[]
  >([]);
  const likedArticleList = exampleUserLikedArticles.articles.map(
    (article) => article.id
  );

  const userLikedArticleList = exampleUserLikedArticles.articles.map(
    (article) => {
      return (
        <UserLikedArticle
          key={article.id}
          article={article}
          userInfo={userInfo}
          checkedLikedArticleIdList={checkedLikedArticleIdList}
          setCheckedLikedArticleIdList={setCheckedLikedArticleIdList}
        />
      );
    }
  );

  return (
    <Wrapper>
      <Header>
        <div className="title">제목</div>
        <div className="date">작성일</div>
        <div className="viewCount">조회</div>
      </Header>
      <UserArticleBox>
        <UserInfoPaginationBox
          userRelatedList={userLikedArticleList.reverse()}
          bunch={26}
        >
          <UserBottomButtons
            id={3}
            userInfo={userInfo}
            likedArticleList={likedArticleList}
            checkedLikedArticleIdList={checkedLikedArticleIdList}
            setCheckedLikedArticleIdList={setCheckedLikedArticleIdList}
          />
        </UserInfoPaginationBox>
      </UserArticleBox>
    </Wrapper>
  );
};
export default UserLikedArticleList;
