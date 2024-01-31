import { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserComments } from "../../../../../API/UserAPI";
import { CommentBriefType } from "../../../../../Types";
import UserComment from "../userRelatedItem/UserComment";
import UserBottomButtons from "../UserBottomButtons";

const Wrapper = styled.div`
  font-size: 13px;
`;

interface PropsUserCommentList {
  id: number;
  isMyInfo: boolean;
  userNickname: string;
  checkedArticleIdList: number[];
  setCheckedArticleIdList: (value: number[]) => void;
}

const UserCommentList = ({
  id,
  isMyInfo,
  userNickname,
  checkedArticleIdList,
  setCheckedArticleIdList,
}: PropsUserCommentList) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [userCommentList, setUserCommentList] = useState<CommentBriefType[]>(
    []
  );

  useEffect(() => {
    getUserComments({ page: pageNumber })
      .then((res) => {
        return res.data.userComments;
      })
      .then((res) => {
        setUserCommentList(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getUserComments({ page: pageNumber })
      .then((res) => {
        return res.data.userComments;
      })
      .then((res) => {
        setUserCommentList(res.content);
      })
      .catch((err) => console.error(err));
  }, [pageNumber, userNickname]);

  if (userCommentList)
    return (
      <Wrapper>
        <div className="list">
          {userCommentList.length !== 0 ? (
            userCommentList.map((comment) => <UserComment comment={comment} />)
          ) : (
            <div className="noArticlesMessage">댓글이 없습니다.</div>
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
};
export default UserCommentList;
