import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";

import {
  editComment,
  editReComment,
  postComment,
  postReComment,
} from "../../../../../API/CommentAPI";
import { useMyProfile } from "../../../../../API/UserAPI";

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
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        button.submit,
        button.cancel {
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
        .secret {
          cursor: pointer;
        }
        button.secret {
          width: 14px;
          height: 14px;
          border: transparent;
          outline: none;
          margin-right: 3px;
          background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-off.svg?35434b8085dcc93722a1fc0df301bcf1=);
        }
        button.secret.active {
          background-image: url(https://ca-fe.pstatic.net/web-section/static/img/ico-write-check-on.svg?ed25ed391f00228242d83867666d617e=);
        }
        label.secret {
          font-size: 11px;
          margin-right: 10px;
        }
        ${(props) =>
          props.$commentLength === 0
            ? css`
                button.submit,
                button.cancel {
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
  refetchComments: () => Promise<void>;
}

const CommentWriter = ({
  articleId,
  setIsCommentWriterOpen,
  info,
  setIsEditMode,
  refetchComments,
}: PropsCommentWriter) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const commentTextarea = useRef<HTMLTextAreaElement | null>(null);
  const { myProfile } = useMyProfile();

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
      await postComment({
        articleId: Number(articleId),
        content: commentInput,
        isSecret: isSecret,
      });
      await refetchComments();
      setCommentInput("");
    }
  };
  const handlePostReComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      // context 작업 필요("userId"에는 userId 가 들어가야함)
      if (info.commentId && setIsCommentWriterOpen) {
        await postReComment({
          articleId: Number(articleId),
          commentId: info.commentId,
          content: commentInput,
          isSecret: isSecret,
        });
        await refetchComments();
        setIsCommentWriterOpen(false);
        setCommentInput("");
      }
    }
  };
  const handleEditComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      if (info.commentId && setIsEditMode) {
        await editComment(Number(articleId), info.commentId, commentInput);
        await refetchComments();
        setIsEditMode(false);
        setCommentInput("");
      }
    }
  };
  const handleEditReComment = async () => {
    if (commentInput.length === 0) {
      return alert("내용을 입력해주세요");
    } else {
      if (info.commentId && info.reCommentId && setIsEditMode) {
        await editReComment({
          articleId: Number(articleId),
          commentId: info.commentId,
          reCommentId: info.reCommentId,
          content: commentInput,
        });
        await refetchComments();
        setIsEditMode(false);
        setCommentInput("");
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
        <div className="writerName">{myProfile?.nickname}</div>
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
            {info.type === "comment" || info.type === "reComment" ? (
              <>
                {" "}
                <button
                  id="setCommentSecretButton"
                  className={isSecret ? "secret active" : "secret"}
                  onClick={() => setIsSecret(!isSecret)}
                />
                <label htmlFor="setCommentSecretButton" className="secret">
                  비밀댓글로 쓰기
                </label>
              </>
            ) : null}
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
