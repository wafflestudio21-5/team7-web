import { useUserLikedArticles } from "../../../../../API/UserAPI";
import styled from "styled-components";

import UserBottomButtons from "../UserBottomButtons";
import UserLikedArticle from "../userRelatedItem/UserLikedArticle";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  font-size: 13px;
`;

interface PropsUserLikedArticleList {
  id: number;
  isMyInfo: boolean;
  userNickname: string;
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
}
const UserLikedArticleList = ({
  id,
  isMyInfo,
  userNickname,
  checkedArticleIdList,
  setCheckedArticleIdList,
}: PropsUserLikedArticleList) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { userLikedArticles, refetchUserLikedArticles } = useUserLikedArticles(
    {}
  );
  const articleIdList = userLikedArticles?.articleBrief.content.map(
    (article) => article.id
  );
  useEffect(() => {
    if (userLikedArticles) {
      setTotalPages(userLikedArticles.articleBrief.totalPages);
    }
  }, [userLikedArticles]);

  if (articleIdList && userLikedArticles) {
    return (
      <Wrapper>
        <div className="list">
          {userLikedArticles.articleBrief.content.length !== 0 ? (
            userLikedArticles.articleBrief.content.map((article) => (
              <UserLikedArticle
                key={article.id}
                article={article}
                isMyInfo={isMyInfo}
                checkedArticleIdList={checkedArticleIdList}
                setCheckedArticleIdList={setCheckedArticleIdList}
              />
            ))
          ) : (
            <div className="noArticlesMessage">좋아요한 게시글이 없습니다.</div>
          )}
        </div>
        <div className="bottomButtons">
          <UserBottomButtons
            id={id}
            isMyInfo={isMyInfo}
            checkedArticleIdList={checkedArticleIdList}
            setCheckedArticleIdList={setCheckedArticleIdList}
            articleIdList={articleIdList}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPages}
            refetchUserLikedArticles={refetchUserLikedArticles}
          />
        </div>
      </Wrapper>
    );
  }
};

export default UserLikedArticleList;
