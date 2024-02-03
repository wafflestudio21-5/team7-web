import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import CommentWriter from "./CommentWriter";
import CommentMenuModal from "./CommentMenuModal";
import menuDotsIcon from "../../../../../assets/comments-menuDots.svg";
import { useMyProfile } from "../../../../../API/UserAPI";

const Wrapper = styled.li`
  /* width: 100%; */
  padding: 12px 23px 10px 0;
  background: #f9f9fa;
  font-size: 13px;
  position: relative;
  & > .contentBox {
    width: 800px;
    padding: 0 0 0 92px;
    box-sizing: border-box;
    position: relative;
    left: 29px;
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
  & > .commentWriterBox {
    display: inline-block;
    width: 754px;
    padding-left: 46px;
  }

  em {
    font-style: normal;
  }
`;
interface PropsReComment {
  commentId: number;
  reComment: {
    id: number;
    content: string;
    lastModified: string;
    nickname: string;
  };
  articleId: string;
  refetchComments: () => Promise<void>;
  isCommentAllowed: boolean;
}

const ReComment = ({
  commentId,
  reComment,
  articleId,
  refetchComments,
  isCommentAllowed,
}: PropsReComment) => {
  const [isCommentWriterOpen, setIsCommentWriterOpen] =
    useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { myProfile } = useMyProfile();

  if (isEditMode && myProfile) {
    return (
      <Wrapper>
        <CommentWriter
          articleId={articleId}
          setIsCommentWriterOpen={setIsCommentWriterOpen}
          info={{
            type: "editReComment",
            commentId: commentId,
            reCommentId: reComment.id,
            inputValue: reComment.content,
          }}
          setIsEditMode={setIsEditMode}
          refetchComments={refetchComments}
        />
      </Wrapper>
    );
  } else if (myProfile) {
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
                  <em>{reComment.nickname}</em>
                </Link>
              </div>
              <div className="content">{reComment.content}</div>
              <div className="commentInfo">
                <span>
                  {reComment.lastModified
                    .replace(/-/g, ".")
                    .replace(/T/, ". ")
                    .replace(/.\d\d\d\d\d\d/, "")}
                </span>
                <span>
                  {isCommentAllowed ? (
                    <button
                      onClick={() => {
                        setIsCommentWriterOpen(!isCommentWriterOpen);
                      }}
                    >
                      답글쓰기
                    </button>
                  ) : null}
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
                type="reComment"
                articleId={articleId}
                commentId={commentId}
                reCommentId={reComment.id}
                refetchComments={refetchComments}
                isMyComment={myProfile.nickname === reComment.nickname}
                setIsCommentWriterOpen={setIsCommentWriterOpen}
                isCommentAllowed={isCommentAllowed}
              />
            ) : null}
          </div>
        </div>
        {isCommentWriterOpen ? (
          <div className="commentWriterBox">
            <CommentWriter
              articleId={articleId}
              setIsEditMode={setIsEditMode}
              setIsCommentWriterOpen={setIsCommentWriterOpen}
              info={{
                type: "reComment",
                commentId: commentId,
              }}
              refetchComments={refetchComments}
            />
          </div>
        ) : null}
      </Wrapper>
    );
  }
};

export default ReComment;
