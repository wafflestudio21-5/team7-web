import { styled, css } from "styled-components";
import { FirstCol } from "./FirstColumn";
import { NoticeTr } from "./NoticeRow";
import { BoardType } from "../../BoardContext/BoardAttrContext";
import { aList } from "../../../Constants";
import { useNoticeContext } from "../../BoardContext/NoticeContext";
import { useState } from "react";
import { ArticleType } from "../../../Types";

const StyledTable = styled.table<{ $brdName: boolean }>`
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  word-break: break-word;
  table-layout: fixed;
  border-collapse: collapse;

  colgroup {
    display: table-column-group;
  }

  caption {
    .blind {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
    }
  }
`;

const StyledColgroup = styled.colgroup<{ $brdType: string }>`
  ${(props) => {
    switch (props.$brdType) {
      case "home":
        return css`
          .blank {
            width: 40px;
          }
          .author {
            width: 120px;
          }
          .date {
            width: 100px;
          }
          .view {
            width: 80px;
          }
        `;
      case "total":
        return css`
          .blank {
            width: 80px;
          }
          .author {
            width: 118px;
          }
          .date {
            width: 80px;
          }
          .view {
            width: 68px;
          }
        `;
      case "popular":
        return css`
          .blank {
            width: 40px;
          }
          .author {
            width: 134px;
          }
          .date {
            width: 80px;
          }
          .view {
            width: 68px;
          }
          .like {
            width: 68px;
          }
        `;
      case "common":
        return css`
          .blank {
            width: 80px;
          }
          .author {
            width: 118px;
          }
          .date {
            width: 80px;
          }
          .view {
            width: 68px;
          }
          .like {
            width: 68px;
          }
        `;
    }
  }}
`;

const StyledThead = styled.thead`
  th {
    height: 40px;
    padding: 2px;

    border-top: 1px solid #666;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    font-size: 13px;
    color: #4e4e4e;
    margin: 0;

    .sort_likes {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 6px;
        right: -12px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4px;
        border-color: #777 transparent transparent transparent;
      }

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const StyledTbody = styled.tbody``;

export const StyledTr = styled.tr`
  td {
    height: 28px;
    padding: 4px 7px;
    border-bottom: 1px solid #f2f2f2;
    font-size: 13px;
    line-height: normal;
  }

  .title {
    .board_list {
      padding-top: 1px;

      .inner_list {
        display: flex;
        justify-content: flex-start;
        width: 100%;

        .article_title {
          margin-right: 4px;
          line-height: 18px;
          color: #333;
          align-items: center;

          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .comment {
          font-weight: 700;
          color: #ff2f3b;
          margin-left: -1px;

          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }

          em {
            font-style: normal;
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

  .dot {
    padding-left: 0;
    padding-right: 8px;
    width: 11px;
    img {
      background-color: #333;
    }
  }

  .boardName {
    display: table-cell;
    padding: 0 7px 0 0;
    vertical-align: middle;

    font-size: 11px;
  }

  .td_article {
    padding: 4px 0 4px 7px;
  }

  .ranking,
  .number {
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
  }
`;

export const ArticleTable = ({
  board,
  articleList,
  isLike,
}: {
  board: BoardType;
  articleList: ArticleType[];
  isLike?: boolean;
}) => {
  const { isNoticeOff } = useNoticeContext();
  const [isSortLike, setIsSortLike] = useState(false); //인기순 (기준이 명확하지 않아 일단 보류해두었습니다.)
  
  const DateOnly = (arg: string) => {
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    const dateNum = arg.match(dateRegex)![0];
    return dateNum.split('-').join('.');
  }

  return (
    <StyledTable $brdName={board.firstCol === "boardName"}>
      <caption>
        <span className="blind">게시물 목록</span>
      </caption>
      <StyledColgroup $brdType={board.type}>
        <col className="blank"></col>
        <col></col>
        <col className="author"></col>
        <col className="date"></col>
        <col className="view"></col>
        {board.likeCol || isLike ? <col className="like"></col> : null}
      </StyledColgroup>
      {board.head ? (
        <StyledThead>
          <th scope="col">
            <span></span>
          </th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">작성일</th>
          <th scope="col">조회</th>
          {board.likeCol || isLike ? (
            <th scope="col">
              {board.likeCol === "sort" ? (
                <span
                  className="sort_likes"
                  onClick={() => setIsSortLike(!isSortLike)}
                >
                  좋아요
                </span>
              ) : (
                "좋아요"
              )}
            </th>
          ) : null}
        </StyledThead>
      ) : null}
      <StyledTbody>
        {/* notice의 개수는 페이지네이션 한 페이지당 글 개수에 포함 x */}
        {board.noticeRow && !isNoticeOff
          ? aList.map((notice) => (
              <NoticeTr notice={notice} isLike={board.likeCol} DateOnly={DateOnly}></NoticeTr>
            ))
          : null}
        {articleList.map((article: ArticleType, index: number) => (
          <StyledTr key={index}>
            <td
              className={
                board.firstCol === "boardName" ? "td_article" : undefined
              }
            >
              <div className={board.firstCol}>
                {/* 아티클마다 첫번째 정보 */}
                <FirstCol
                  firstCol={board.firstCol}
                  board={article.board.board_name}
                  ranking={index}
                  articleId={article.id}
                ></FirstCol>
              </div>
            </td>
            <td>
              <div className="title">
                <div className="board_list">
                  <div className="inner_list">
                    <span className="article_title">{article.title}</span>
                    <span></span>
                    {/* 댓글 개수를 넣어야 하는데 ArticleType에 없어서 일단 보류했습니다. */}
                    <span className="comment">
                      {" ["}
                      <em>{article.view_cnt}</em>
                      {"] "}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="td_author">
              <div className="ArticleBoardAuthorInfo">
                <button>
                  <span className="nickname">{article.user.nickname}</span>
                </button>
              </div>
            </td>
            <td className="td_date">{DateOnly(article.created_at)}.</td>
            <td className="td_view">{article.view_cnt}</td>
            {board.likeCol || isLike ? (
              <td className="td_likes">{article.like_cnt}</td>
            ) : null}
          </StyledTr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};
