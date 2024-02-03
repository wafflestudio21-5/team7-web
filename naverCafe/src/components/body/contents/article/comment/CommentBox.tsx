import styled from "styled-components";

import Comment from "./Comment";
import CommentWriter from "./CommentWriter";
import ReComment from "./ReComment";
import { CommentType } from "../../../../../Types";
import { useMyProfile } from "../../../../../API/UserAPI";

const Wrapper = styled.div`
  position: relative;
  & > h3 {
    text-align: left;
    margin: 0 0 11px;
    padding: 16px 0 0;
    font-size: 17px;
  }
  & > .commentList {
    display: inline-block;
    width: 858px;
    box-sizing: border-box;
    position: relative;
    left: -29px;
  }
`;

interface PropsCommentList {
  articleId: string;
  comments: CommentType[];
  refetchComments: () => Promise<void>;
  isCommentAllowed: boolean;
}

const CommentBox = ({
  articleId,
  comments,
  refetchComments,
  isCommentAllowed,
}: PropsCommentList) => {
  const { myProfile } = useMyProfile();
  const commentList = comments.map((comment) => {
    return (
      <ul key={comment.id}>
        <Comment
          comment={comment}
          articleId={articleId}
          refetchComments={refetchComments}
          isCommentAllowed={isCommentAllowed}
        />
        {comment.recomments.map((reComment) => {
          return (
            <ul key={reComment.id}>
              <ReComment
                commentId={comment.id}
                reComment={reComment}
                articleId={articleId}
                refetchComments={refetchComments}
                isCommentAllowed={isCommentAllowed}
              />
            </ul>
          );
        })}
      </ul>
    );
  });
  // commentList 안에 reCommentList 포함...
  // recommentList의 reComment에는 commentId 데이터가 포함되어야 함
  console.log("isCommentAllowed:", isCommentAllowed);
  return (
    <Wrapper>
      <h3>댓글</h3>
      <div className="commentList">{commentList}</div>
      {myProfile && isCommentAllowed ? (
        <CommentWriter
          articleId={articleId}
          info={{
            type: "comment",
          }}
          refetchComments={refetchComments}
        />
      ) : null}
    </Wrapper>
  );
};

export default CommentBox;
