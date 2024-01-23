import UserArticle from "./userRelatedArticle/UserArticle";
import UserComment from "./userRelatedArticle/UserComment";
import UserCommentedArticle from "./userRelatedArticle/UserCommentedArticle";
import UserLikedArticle from "./userRelatedArticle/UserLikedArticle";

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

interface PropsUserRelatedArticleList {
  id: number;
  userInfo: {
    userId: string;
    username: string;
    userNickname: string;
    rank: number;
    visit_count: number;
    my_article_count: number;
  };
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
}

const UserRelatedArticleList = ({
  id,
  userInfo,
  checkedArticleIdList,
  setCheckedArticleIdList,
}: PropsUserRelatedArticleList) => {
  if (id === 0) {
    // 실제론, 서버에서 id에 따라서 다른 데이터를 받아오기
    const data = exampleUserArticles;
    return data.articles.map((article) => {
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
  } else if (id === 1) {
    // 실제론, 서버에서 id에 따라서 다른 데이터를 받아오기
    const data = exampleUserComments;
    return data.comments.map((comment) => {
      return <UserComment key={comment.id} comment={comment} />;
    });
  } else if (id === 2) {
    // 실제론, 서버에서 id에 따라서 다른 데이터를 받아오기
    const data = exampleUserCommentedArticleList;
    return data.articles.map((article) => {
      return <UserCommentedArticle key={article.id} article={article} />;
    });
  } else {
    // 실제론, 서버에서 id에 따라서 다른 데이터를 받아오기
    const data = exampleUserLikedArticles;
    return data.articles.map((article) => {
      return (
        <UserLikedArticle
          key={article.id}
          article={article}
          userInfo={userInfo}
          checkedArticleIdList={checkedArticleIdList}
          setCheckedArticleIdList={setCheckedArticleIdList}
        />
      );
    });
  }
};
export default UserRelatedArticleList;
