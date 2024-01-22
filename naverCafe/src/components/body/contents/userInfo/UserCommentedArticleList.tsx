import styled from "styled-components";
import UserCommentedArticle from "./UserCommentedArticle";
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
const UserCommentedArticleBox = styled.div``;

const exampleUserCommentedArticleList = {
  articles: [
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
  ],
};
interface PropsUserCommentedArticleList {
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
}

const UserCommentedArticleList = ({
  userInfo,
}: PropsUserCommentedArticleList) => {
  const userCommentedArticleList = exampleUserCommentedArticleList.articles.map(
    (article) => {
      return <UserCommentedArticle key={article.id} article={article} />;
    }
  );

  return (
    <Wrapper>
      <Header>
        <div className="title">제목</div>
        <div className="date">작성일</div>
        <div className="viewCount">조회</div>
      </Header>
      <UserCommentedArticleBox>
        <UserInfoPaginationBox
          userRelatedList={userCommentedArticleList.reverse()}
          bunch={13}
        >
          <UserBottomButtons id={2} userInfo={userInfo} />
        </UserInfoPaginationBox>
      </UserCommentedArticleBox>
    </Wrapper>
  );
};
export default UserCommentedArticleList;
