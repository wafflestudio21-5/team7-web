import styled from "styled-components";
import UserComment from "./UserComment";
import UserBottomButtons from "./UserBottomButtons";
import UserInfoPaginationBox from "./UserInfoPaginationBox";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  padding: 2px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
`;
const UserCommentBox = styled.div``;

const exampleUserComments = {
  comments: [
    {
      id: 1,
      content: "댓글 내용",
      last_modified: "2024-01-14T12:30:45",
      title: "게시물 제목",
      articleId: 5,
      commentCount: 23,
    },
    {
      id: 2,
      content: "대한민국 헌법 제 1조 1항!",
      last_modified: "2024-01-14T12:31:49",
      title: "송강호 연기 대박이네요",
      articleId: 4,
      commentCount: 10,
    },
    {
      id: 3,
      content:
        "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddfdffffffffffffffff",
      last_modified: "2024-01-15T12:31:49",
      title: "테스트입니다.",
      articleId: 10,
      commentCount: 2,
    },
  ],
};

interface PropsUserCommentList {
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
}

const UserCommentList = ({ userInfo }: PropsUserCommentList) => {
  const userCommentList = exampleUserComments.comments.map((comment) => {
    return <UserComment key={comment.id} comment={comment} />;
  });
  return (
    <Wrapper>
      <Header>
        <div>댓글</div>
      </Header>
      <UserCommentBox>
        <UserInfoPaginationBox
          userRelatedList={userCommentList.reverse()}
          bunch={26}
        >
          <UserBottomButtons id={1} userInfo={userInfo} />
        </UserInfoPaginationBox>
      </UserCommentBox>
    </Wrapper>
  );
};
export default UserCommentList;
