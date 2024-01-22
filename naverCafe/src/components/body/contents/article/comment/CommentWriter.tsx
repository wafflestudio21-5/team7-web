import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";

import {
  editComment,
  editReComment,
  getComments,
  postComment,
  postReComment,
} from "../../../../../API/ArticleAPI";

const Wrapper = styled.div<{
  $commentLength: number;
  $type: "comment" | "reComment" | "editComment" | "editReComment";
}>`
  ${(props) => {
    if (props.$type === "editComment" || props.$type === "editReComment") {
      return css`
        position: relative;
        left: 12px;
      `;
    }
  }}
  & > .CommentWriter {
    margin: ${(props) =>
      props.$type === "comment" ? "12px 0 29px" : "12px 0 0"};
    padding: 16px 10px 10px 18px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background: #fff;
    & > .writerName {
      text-align: left;
      font-size: 13px;
      font-weight: 700;
      margin: 0 0 10px;
    }
    & > textarea {
      width: 100%;
      min-height: 17px;
      max-height: 500px;
      padding: 0 1px 0 0;
      border: 0;
      outline: 0;
      font-size: 13px;
      resize: none;
      overflow: hidden;
      overflow-wrap: break-word;
      font-family: "맑은 고딕", Malgun Gothic, dotum, sans-serif;
    }
    & > .footer {
      height: 34px;
      position: relative;
      & > .right {
        position: absolute;
        right: 0;
        button {
          display: inline-block;
          min-width: 46px;
          height: 34px;
          line-height: 36px;
          font-size: 13px;
          font-weight: 700;
          border: none;
          outline: none;
          border-radius: 6px;
          cursor: pointer;
        }
        ${(props) =>
          props.$commentLength === 0
            ? css`
                button {
                  background: inherit;
                  color: #b7b7b7;
                }
              `
            : css`
                & > .cancel {
                  background: inherit;
                  color: #b7b7b7;
                }
                & > .submit {
                  background: rgba(3, 199, 90, 0.12);
                  color: #009f47;
                }
              `}
      }
    }
  }
`;

// 로컬에서 테스트를 위한 데이터입니다.
const exampleArticle = {
  id: 1,
  title: "안녕하세요",
  content: "이것은 내용입니다.",
  created_at: "2024-01-14T12:00:00",
  view_cnt: 23,
  like_cnt: 1,
  user: {
    username: "조현우",
    user_id: "subakbro123",
  },
  board: {
    board_id: 3,
    board_name: "자유게시판",
  },
  allow_comments: true,
  is_notification: false,
};

interface PropsCommentWriter {
  articleId: string | undefined;
  setIsCommentWriterOpen?: (value: boolean) => void;
  info: {
    type: "comment" | "reComment" | "editComment" | "editReComment";
    commentId?: number;
    reCommentId?: number;
    inputValue?: string;
  };
  setIsEditMode?: (value: boolean) => void;
}

const CommentWriter = ({
  articleId,
  setIsCommentWriterOpen,
  info,
  setIsEditMode,
}: PropsCommentWriter) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const commentTextarea = useRef<HTMLTextAreaElement | null>(null);

  const handleCommentTextareaHeight = () => {
    if (commentTextarea.current !== null) {
      commentTextarea.current.style.height = "auto";
      commentTextarea.current.style.height =
        commentTextarea.current.scrollHeight + "px";
    }
  };

  const handlePostComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      await postComment(Number(articleId), "userId", commentInput);
      await getComments(Number(articleId));
      setCommentInput("");
    }
  };
  const handlePostReComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      // context 작업 필요("userId"에는 userId 가 들어가야함)
      if (info.commentId) {
        await postReComment(
          Number(articleId),
          info.commentId,
          "userId",
          commentInput
        );
        await getComments(Number(articleId));
        setCommentInput("");
      }
    }
  };
  const handleEditComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      if (info.commentId) {
        await editComment(
          Number(articleId),
          info.commentId,
          "userId",
          commentInput
        );
        await getComments(Number(articleId));
      }
    }
  };
  const handleEditReComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      if (info.commentId && info.reCommentId) {
        await editReComment(
          Number(articleId),
          info.commentId,
          info.reCommentId,
          "userId",
          commentInput
        );
        await getComments(Number(articleId));
      }
    }
  };
  useEffect(() => {
    if (info.inputValue && commentInput === "") {
      setCommentInput(info.inputValue);
    }
  }, []);

  return (
    <Wrapper $commentLength={commentInput.length} $type={info.type}>
      <div className="CommentWriter">
        <div className="writerName">{exampleArticle.user.username}</div>
        <textarea
          ref={commentTextarea}
          placeholder="댓글을 남겨보세요"
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
            handleCommentTextareaHeight();
          }}
        />
        <div className="footer">
          <div className="right">
            {info.type !== "comment" ? (
              <button
                className="cancel"
                onClick={() => {
                  if (setIsCommentWriterOpen) {
                    setIsCommentWriterOpen(false);
                  }
                  if (setIsEditMode) {
                    setIsEditMode(false);
                  }
                }}
              >
                취소
              </button>
            ) : null}
            <button
              className="submit"
              onClick={() => {
                if (info.type === "comment") {
                  handlePostComment();
                } else if (info.type === "reComment") {
                  handlePostReComment();
                } else if (info.type === "editComment") {
                  handleEditComment();
                } else if (info.type === "editReComment") {
                  handleEditReComment();
                }
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CommentWriter;
