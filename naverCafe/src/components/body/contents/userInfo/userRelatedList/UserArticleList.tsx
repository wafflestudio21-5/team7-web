import { useUserArticles } from "../../../../../API/UserAPI";
import styled from "styled-components";
import { useEffect, useState } from "react";

import UserArticle from "../userRelatedItem/UserArticle";
import UserBottomButtons from "../UserBottomButtons";

const Wrapper = styled.div`
  font-size: 13px;
`;

interface PropsUserArticleList {
  id: number;
  isMyInfo: boolean;
  userNickname: string;
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
}
const UserArticleList = ({
  id,
  isMyInfo,
  userNickname,
  checkedArticleIdList,
  setCheckedArticleIdList,
}: PropsUserArticleList) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { userArticles, refetchUserArticles } = useUserArticles({
    userNickname: userNickname,
  });
  const articleIdList = userArticles?.articleBrief.content.map(
    (article) => article.id
  );
  //  total page 수를 구합니다.
  useEffect(() => {
    if (userArticles) {
      setTotalPages(userArticles.articleBrief.totalPages);
    }
  }, [userArticles]);

  if (userArticles && articleIdList) {
    return (
      <Wrapper>
        <div className="list">
          {userArticles.articleBrief.content.length !== 0 ? (
            userArticles.articleBrief.content.map((article) => (
              <UserArticle
                key={article.id}
                article={article}
                isMyInfo={isMyInfo}
                checkedArticleIdList={checkedArticleIdList}
                setCheckedArticleIdList={setCheckedArticleIdList}
              />
            ))
          ) : (
            <div className="noArticlesMessage">게시글이 없습니다.</div>
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
            refetchUserArticles={refetchUserArticles}
          />
        </div>
      </Wrapper>
    );
  }
};

export default UserArticleList;
