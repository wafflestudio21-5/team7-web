import { useEffect, useState } from "react";
import styled from "styled-components";
import { CommentedArticleType } from "../../../../../Types";
import { getUserCommentedArticle } from "../../../../../API/UserAPI";
import UserCommentedArticle from "../userRelatedItem/UserCommentedArticle";
import UserBottomButtons from "../UserBottomButtons";

const Wrapper = styled.div`
  font-size: 13px;
`;

interface PropsUserCommentedArticleList {
  id: number;
  isMyInfo: boolean;
  userNickname: string;
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
}

const UserCommentedArticleList = ({
  id,
  isMyInfo,
  userNickname,
  checkedArticleIdList,
  setCheckedArticleIdList,
}: PropsUserCommentedArticleList) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [userCommentedArticleList, setUserCommentedArticleList] = useState<
    CommentedArticleType[]
  >([]);

  useEffect(() => {
    getUserCommentedArticle({ userNickname: userNickname, page: pageNumber })
      .then((res) => res.data.commentedArticles)
      .then((res) => {
        setUserCommentedArticleList(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    getUserCommentedArticle({ userNickname: userNickname, page: pageNumber })
      .then((res) => res.data.commentedArticles)
      .then((res) => setUserCommentedArticleList(res.content))
      .catch((err) => console.log(err));
  }, [userNickname, pageNumber]);

  if (userCommentedArticleList) {
    return (
      <Wrapper>
        <div className="list">
          {userCommentedArticleList.length !== 0 ? (
            userCommentedArticleList.map((article) => (
              <UserCommentedArticle key={article.id} article={article} />
            ))
          ) : (
            <div className="noArticlesMessage">
              댓글을 단 게시물이 없습니다.
            </div>
          )}
        </div>
        <div className="bottomButtons">
          <UserBottomButtons
            id={id}
            isMyInfo={isMyInfo}
            checkedArticleIdList={checkedArticleIdList}
            setCheckedArticleIdList={setCheckedArticleIdList}
            articleIdList={[]}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
          />
        </div>
      </Wrapper>
    );
  }
};
export default UserCommentedArticleList;
