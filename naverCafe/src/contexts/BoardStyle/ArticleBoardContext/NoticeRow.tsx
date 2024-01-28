//Home: 좋아요 x, Total: 좋아요 x, Common: 좋아요 o

import styled from "styled-components";
import { ArticleType } from "../../../Types";

const StyledNoticeTr = styled.tr`
  background: #f9f9f8;
  td {
    height: 28px;
    padding: 4px 7px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 13px;
    line-height: normal;

    &.td_article {
      font-weight: bold;
      align-items: center;
      white-space: nowrap;

      padding-left: 12px;
      padding-right: 18px;

      .title {
        display: flex;

        .board_list {
          width: 420px;
          text-align: left;
          padding-top: 4px;

          .inner_list {
            .article_title,
            .comment {
              color: #ff4e59;

              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
            em {
              font-style: normal;
            }
          }
        }
        .board-tag {
          width: 56px;
          padding-right: 20px;
          text-align: center;
          vertical-align: middle;

          .board-tag-txt {
            border: 1px solid #ffc6c9;
            background-color: #ffe3e4;
            color: #ff4e59;

            display: block;
            width: 56px;
            height: 21px;
            box-sizing: border-box;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 800;
            line-height: 19px;
          }
        }
      }
    }
  }
  .td_author {
    .ArticleBoardAuthorInfo {
      position: relative;

      button {
        text-align: left;
        cursor: pointer;
        border: 0;
        background: none;
        margin: 0;
        padding: 0;

        .nickname {
          word-wrap: break-word;
          word-break: break-word;
          color: #666;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .td_date,
  .td_view,
  .td_likes {
    color: #666;
    text-align: center;
  }

  .td_date {
    white-space: nowrap;
  }
`;

export const NoticeTr = ({
  notice,
  isLike,
  DateOnly,
}: {
  notice: ArticleType;
  isLike: boolean;
  DateOnly: (arg: string) => string;
}) => {
  return (
    <StyledNoticeTr>
      <td scope="col" colSpan={2} className="td_article">
        <div className="title">
          <div className="board-tag">
            <strong className="board-tag-txt">
              <span className="inner">공지</span>
            </strong>
          </div>
          <div className="board_list">
            <div className="inner_list">
              <span className="article_title">{notice.title}</span>
              <span className="comment">
                {" ["}
                <em>{notice.commentCount}</em>
                {"] "}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td scope="col" className="td_author">
        <div className="ArticleBoardAuthorInfo">
          <button>
            <span className="nickname">{notice.author.nickname}</span>
          </button>
        </div>
      </td>
      <td scope="col" className="td_date">
        {DateOnly(notice.createdAt)}.
      </td>
      <td scope="col" className="td_view">
        {notice.viewCount}
      </td>
      {isLike ? (
        <td scope="col" className="td_likes">
          {notice.likeCount}
        </td>
      ) : null}
    </StyledNoticeTr>
  );
};
