import styled from "styled-components";

import Comment from "./Comment";
import CommentWriter from "./CommentWriter";
import ReComment from "./ReComment";
import { CommentType } from "../../../../../Types";

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

// 로컬에서 테스트하기 위한 데이터입니다.
// const exampleComment = {
//   comments: [
//     {
//       id: 1,
//       content: "안녕하세요",
//       created_at: "2024-01-14T12:30:45",
//       username: "dodo",
//       reComments: [
//         {
//           id: 101,
//           content: "댓글 달아주셔서 감사합니다.",
//           created_at: "2024-01-14T12:35:00",
//           username: "subakbro123",
//         },
//       ],
//     },
//     {
//       id: 2,
//       content: "잘 부탁드립니다.dddddddddddddddddddddd",
//       created_at: "2024-01-14T12:45:55",
//       username: "testAccount",
//       reComments: [],
//     },
//   ],
// };

interface PropsCommentList {
  articleId: string;
  comments: CommentType[];
  refetchComments: () => Promise<void>;
}

const CommentBox = ({
  articleId,
  comments,
  refetchComments,
}: PropsCommentList) => {
  const commentList = comments.map((comment) => {
    return (
      <ul key={comment.id}>
        <Comment
          comment={comment}
          articleId={articleId}
          refetchComments={refetchComments}
        />
        {comment.recomments.map((reComment) => {
          return (
            <ul key={reComment.id}>
              <ReComment
                commentId={comment.id}
                reComment={reComment}
                articleId={articleId}
                refetchComments={refetchComments}
              />
            </ul>
          );
        })}
      </ul>
    );
  });
  // commentList 안에 reCommentList 포함...
  // recommentList의 reComment에는 commentId 데이터가 포함되어야 함
  return (
    <Wrapper>
      <h3>댓글</h3>
      <div className="commentList">{commentList}</div>
      <CommentWriter
        articleId={articleId}
        info={{
          type: "comment",
        }}
        refetchComments={refetchComments}
      />
    </Wrapper>
  );
};

export default CommentBox;
