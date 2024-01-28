import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import menuDotsIcon from "../../../../../assets/comments-menuDots.svg";

import CommentWriter from "./CommentWriter";
import CommentMenuModal from "./CommentMenuModal";

import { CommentType } from "../../../../../Types";

const Wrapper = styled.li`
  /* width: 100%; */
  padding: 12px 23px 0 0;
  background: #f9f9fa;
  font-size: 13px;
  & > .contentBox {
    width: 800px;
    padding: 0 0 0 46px;
    box-sizing: border-box;
    position: relative;
    & > .left {
      display: flex;
      position: relative;
      & > .authorThumb {
        position: absolute;
        left: -46px;
        img {
          width: 36px;
          height: 36x;
        }
      }
      & > .commentBox {
        text-align: left;
        & > .authorNickname {
          font-weight: 700;
          margin-bottom: 4px;
        }
        & > .content {
          display: inline-block;
          max-width: 730px;
          line-height: 17px;
          /* font-weight: 550; */
          word-break: break-all;
          word-wrap: break-word;
        }
        & > .commentInfo {
          margin-top: 7px;
          font-size: 12px;
          color: #979797;
          button {
            margin-left: 8px;
            border: transparent;
            background: inherit;
            font-size: 12px;
            color: #979797;
            cursor: pointer;
          }
        }
      }
    }
    & > .right {
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0px;
      button {
        background: inherit;
        outline: none;
        border: none;
        cursor: pointer;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
`;

interface PropsComment {
  comment: CommentType;
  articleId: string | undefined;
  refetchComments: () => Promise<void>;
}
const Comment = ({ comment, articleId, refetchComments }: PropsComment) => {
  const [isCommentWriterOpen, setIsCommentWriterOpen] =
    useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  console.log("reRendered!");

  if (isEditMode) {
    return (
      <Wrapper>
        <CommentWriter
          articleId={articleId}
          info={{
            type: "editComment",
            commentId: comment.id,
            inputValue: comment.content,
          }}
          setIsEditMode={setIsEditMode}
          refetchComments={refetchComments}
        />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div className="contentBox">
          <div className="left">
            <Link to={"/"} className="authorThumb">
              <img
                src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77"
                alt="작성자 프로필 사진"
              />
            </Link>
            <div className="commentBox">
              <div className="authorNickname">
                <Link to={"/"}>
                  <em>{comment.nickname}</em>
                </Link>
              </div>
              <div className="content">{comment.content}</div>
              <div className="commentInfo">
                <span>
                  {comment.lastModified.replace(/-/g, ".").replace(/T/, ". ")}
                </span>
                <span>
                  <button
                    onClick={() => {
                      setIsCommentWriterOpen(!isCommentWriterOpen);
                    }}
                  >
                    답글쓰기
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="right">
            <button onClick={() => setIsMenuModalOpen(!isMenuModalOpen)}>
              <img src={menuDotsIcon} alt="댓글 메뉴 버튼" />
            </button>
            {isMenuModalOpen ? (
              <CommentMenuModal
                setIsEditMode={setIsEditMode}
                setIsMenuModalOpen={setIsMenuModalOpen}
              />
            ) : null}
          </div>
          {isCommentWriterOpen ? (
            <CommentWriter
              articleId={articleId}
              setIsCommentWriterOpen={setIsCommentWriterOpen}
              info={{
                type: "reComment",
                commentId: comment.id,
              }}
              refetchComments={refetchComments}
            />
          ) : null}
        </div>
      </Wrapper>
    );
  }
};

export default Comment;
