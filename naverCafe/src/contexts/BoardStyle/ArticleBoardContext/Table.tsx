import { styled, css } from "styled-components";
import { FirstCol } from "./FirstColumn";
import { NoticeTr } from "./NoticeRow";
import { BoardType } from "../../BoardContext/BoardAttrContext";
import { useNoticeContext } from "../../BoardContext/NoticeContext";
import { useContext, useEffect, useState } from "react";
import { ArticleType } from "../../../Types";
import { ViewOptionContext } from "../../BoardContext/ViewOptionContext";
import { useNavigate } from "react-router-dom";
import { notiArticle } from "../../../API/ArticleAPI";
import { usePagination } from "../BoardBottomContext/PaginationContext";
import { useMyProfile } from "../../../API/UserAPI";

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

const StyledTbody = styled.tbody`
  & > .noArticle {
    color: #333;
    text-align: center;
    padding: 100px 0;
    border-bottom: 1px solid #f2f2f2;
    font-size: 13px;
  }
`;

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
        text-align: left;

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
          white-space: nowrap;

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
    .popup {
      margin-left: 35px;
      display: table-cell;
      position: absolute;
      z-index: 100;
      border: solid 1px #ddd;
      background-color: #fff;

      width: 100px;
      box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.2);

      text-align: left;
      padding: 8px;

      button {
        all: unset;
        display: inline-block;
        padding: 2px 8px;
        margin: 0;
        color: #000;
        font-size: 14px;
        text-align: right;
      }
      &:hover {
        background-color: #e2faea;
        button {
          color: #03c75a;
        }
      }
    }

    .ArticleBoardAuthorInfo {
      position: relative;
      display: flex;
      justify-content: flex-start;

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

const StyledCardUl = styled.ul`
  list-style: none;
  width: 860px;
`;

const StyledCardLi = styled.li`
  //display: block;
  padding: 16px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eeeeef;

  & > p {
    display: inline-block;
    margin-bottom: 12px;
    color: #666;
    float: left;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  em {
    font-style: normal;
    color: #222;
    margin-left: 4px;
  }

  &::after {
    content: "";
    display: block;
    clear: both;
  }

  .card_area {
    display: table;
    position: relative;
    width: 100%;
    table-layout: fixed;
  }

  .card_area > .con > .con_top {
    display: table-cell;
    position: relative;
    color: #222;

    .tit_area {
      display: table;

      .tit {
        display: table-cell;

        .inner {
          display: table;
          table-layout: fixed;

          strong {
            height: 22px;
            font-size: 16px;
            line-height: 22px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: normal;
            word-break: break-all;
            word-wrap: break-word;
            word-break: break-word;

            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .card_area > .con > .con_top {
    .txt {
      max-height: 44px;
      margin-top: 6px;
      //font-size: 14px;
      line-height: 22px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      word-wrap: break-word;
      word-break: break-word;
      color: #666;

      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .card_area > .con > .con_bottom {
    position: static;
    padding-top: 23px;
    width: 100%;

    .user_info {
      overflow: hidden;

      .pers_nick_area {
        float: left;
        color: #222 !important;

        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .user_info > .date_num {
      float: left;
      color: #999;

      &::before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 2px;
        margin: 0 5px 4px 7px;
        border-radius: 2px;
        background-color: #999;
      }

      .date {
        margin-right: 16px;
      }
    }

    .user_info > .date_num > .like_area {
      display: inline-block;
      padding: 0 0 0 7px;
      vertical-align: top;

      .comment_area {
        display: inline-block;
        margin-right: 5px;
        vertical-align: top;

        .comment_ico {
          display: inline-block;
          background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
          background-repeat: no-repeat;
          vertical-align: top;
          margin-top: 4px;
          font-size: 0;
          line-height: 0;
          color: transparent;
          background-position: -285px -45px;
          width: 13px;
          height: 12px;
        }
      }
      .like {
        display: inline-block;
        vertical-align: top;

        span {
          display: inline-block;
          background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
          background-repeat: no-repeat;
          vertical-align: top;
          margin-top: 5px;
          background-position: -285px -86px; //좋아요 했을 경우 "-4px -250px;"
          width: 13px;
          height: 10px;
        }

        .like_btn > img {
          display: none;
        }
      }

      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
`;

const CardViewUl = ({
  articleList,
  DateOnly,
  isTotalBoard,
}: {
  articleList: ArticleType[];
  DateOnly: (arg: string) => string;
  isTotalBoard: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <StyledCardUl>
      {articleList.map((article, index) => (
        <StyledCardLi key={index}>
          {isTotalBoard ? (
            <p onClick={() => navigate(`/board/${article.board.id}`)}>
              {article.board.name}
            </p>
          ) : null}
          <div className="card_area">
            <div className="con">
              <div className="con_top">
                <div className="tit_area">
                  <p className="tit">
                    <span className="inner">
                      <strong
                        onClick={() => navigate(`/articles/${article.id}`)}
                      >
                        {article.title}
                      </strong>
                    </span>
                  </p>
                </div>
                <p
                  className="txt"
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  {article.content}
                </p>
              </div>
              <div className="con_bottom">
                <div className="user_info">
                  <div
                    className="pers_nick_area"
                    onClick={() => navigate(`/users/${article.author.id}`)}
                  >
                    {article.author.nickname}
                  </div>
                  <div className="date_num">
                    <span className="date">{DateOnly(article.createdAt)}</span>
                    <span className="num">조회 {article.viewCount}</span>
                    <div className="like_area">
                      <div className="comment_area">
                        <span className="comment_ico">댓글</span>
                        <em className="num">{article.commentCount}</em>
                      </div>
                      <div className="like">
                        <span className="like_btn">
                          <img
                            src="	https://ssl.pstatic.net/static/cafe/cafe_pc/btn-recommend-strong.png"
                            alt="좋아요"
                          ></img>
                        </span>
                        <em className="like_cnt">{article.likeCount}</em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StyledCardLi>
      ))}
    </StyledCardUl>
  );
};

export const ArticleTable = ({
  board,
  articleList,
  isLike,
}: {
  board: BoardType;
  articleList: ArticleType[];
  isLike?: boolean;
}) => {
  const { myProfile } = useMyProfile();
  const navigate = useNavigate();
  const { isNoticeOff } = useNoticeContext();
  const [noticeList, setNoticeList] = useState<ArticleType[]>([]);
  const [isSortLike, setIsSortLike] = useState(false);
  const { setSort } = usePagination();
  const { viewOp } = useContext(ViewOptionContext);

  //특정 시간까지는 시간이 표시되고, 그 이후부터는 날짜가 표시되는데 일단 날짜만 표시하는 것으로 뒀습니다.
  const DateOnly = (arg: string) => {
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    const dateNum = arg.match(dateRegex)![0];
    return dateNum.split("-").join(".");
  };

  const handleSortLike = () => {
    setIsSortLike(!isSortLike);
    if (isSortLike) {
      setSort(""); //비동기 처리로 인해.. 그런데 올바른 방법은 아닌 것 같음
    } else {
      setSort("likeCnt,desc");
    }
  };

  const fetchNotiArticle = async () => {
    try {
      const fetchedNotices: ArticleType[] = await notiArticle();
      setNoticeList(fetchedNotices);
    } catch (err) {
      console.log("Error fetching notices");
    }
  };

  useEffect(() => {
    fetchNotiArticle();

    setIsSortLike(false);
    setSort("");
  }, []);

  useEffect(() => {
    setIsSortLike(false);
    setSort("");
  }, [board]);

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
                <span className="sort_likes" onClick={() => handleSortLike()}>
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
          ? noticeList.map((notice) => (
              <NoticeTr
                notice={notice}
                isLike={board.likeCol}
                DateOnly={DateOnly}
                noBtn={board.type === "home"}
                refreshNotice={fetchNotiArticle}
              ></NoticeTr>
            ))
          : null}
        {articleList &&
          (viewOp === 0 ? (
            <CardViewUl
              articleList={articleList}
              DateOnly={DateOnly}
              isTotalBoard={board.type === "total"}
            ></CardViewUl>
          ) : (
            articleList.map((article: ArticleType, index: number) => (
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
                      board={article.board}
                      ranking={index}
                      articleId={article.id}
                    ></FirstCol>
                  </div>
                </td>
                <td>
                  <div className="title">
                    <div className="board_list">
                      <div className="inner_list">
                        <span
                          className="article_title"
                          onClick={() => navigate(`/articles/${article.id}`)}
                        >
                          {article.title}
                        </span>
                        <span></span>

                        {article.commentCount !== 0 ? (
                          <span
                            className="comment"
                            onClick={() => navigate(`/articles/${article.id}`)}
                          >
                            {" ["}
                            <em>{article.commentCount}</em>
                            {"] "}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="td_author">
                  <div className="ArticleBoardAuthorInfo">
                    <button>
                      <span
                        className="nickname"
                        onClick={() => {
                          if (myProfile) {
                            navigate(`/users/${article.author.id}`);
                          } else {
                            navigate(`/login`);
                          }
                        }}
                      >
                        {article.author.nickname}
                      </span>
                    </button>
                  </div>
                </td>
                <td className="td_date">{DateOnly(article.createdAt)}.</td>
                <td className="td_view">{article.viewCount}</td>
                {board.likeCol || isLike ? (
                  <td className="td_likes">{article.likeCount}</td>
                ) : null}
              </StyledTr>
            ))
          ))}
        {articleList.length === 0 && (
          <td className="noArticle" colSpan={board.likeCol ? 6 : 5}>
            등록된 게시글이 없습니다.
          </td>
        )}
      </StyledTbody>
    </StyledTable>
  );
};
