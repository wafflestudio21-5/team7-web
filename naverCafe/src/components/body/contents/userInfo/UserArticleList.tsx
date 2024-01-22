import styled from "styled-components";

import UserArticle from "./UserArticle";
import { useState } from "react";
import UserBottomButtons from "./UserBottomButtons";
import UserInfoPaginationBox from "./UserInfoPaginationBox";

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

const exampleUserArticles = {
  articles: [
    {
      id: 1,
      content: "게시물에 들어있는 내용이요!.",
      last_modified: "2024-01-14T12:30:45",
      title: "안녕하세요(제목입니다.)",
      viewCount: 4,
      commentCount: 5,
    },
    {
      id: 2,
      content: "모두 파이팅입니다!",
      last_modified: "2024-01-15T13:31:31",
      title: "응원의 글 한 마디",
      viewCount: 23,
      commentCount: 2,
    },
    {
      id: 3,
      content: "곧 끝날 것 같아요!",
      last_modified: "2024-01-15T14:38:30",
      title: "모두들 고생 많으십니다.",
      viewCount: 8,
      commentCount: 0,
    },
    {
      id: 4,
      content: "그래그래!",
      last_modified: "2024-01-15T15:38:30",
      title: "369",
      viewCount: 3,
      commentCount: 0,
    },
    {
      id: 5,
      content: "ㅇㅇㅇㅇㅇ",
      last_modified: "2024-01-15T16:38:30",
      title: "dddd",
      viewCount: 3,
      commentCount: 0,
    },
  ],
};
interface PropsUserArticleList {
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
}
const UserArticleList = ({ userInfo }: PropsUserArticleList) => {
  const [checkedArticleIdList, setCheckedArticleIdList] = useState<number[]>(
    []
  );
  const articleIdList = exampleUserArticles.articles.map(
    (article) => article.id
  );
  const userArticleList = exampleUserArticles.articles.map((article) => {
    return (
      <UserArticle
        key={article.id}
        article={article}
        userInfo={userInfo}
        checkedArticleIdList={checkedArticleIdList}
        setCheckedArticleIdList={setCheckedArticleIdList}
      />
    );
  });

  return (
    <Wrapper>
      <Header>
        <div className="title">제목</div>
        <div className="date">작성일</div>
        <div className="viewCount">조회</div>
      </Header>
      <UserArticleBox>
        <UserInfoPaginationBox
          userRelatedList={userArticleList.reverse()}
          bunch={3}
        >
          <UserBottomButtons
            id={0}
            userInfo={userInfo}
            articleIdList={articleIdList}
            checkedArticleIdList={checkedArticleIdList}
            setCheckedArticleIdList={setCheckedArticleIdList}
          />
        </UserInfoPaginationBox>
      </UserArticleBox>
    </Wrapper>
  );
};
export default UserArticleList;
