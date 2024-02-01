import styled, { css } from "styled-components";
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import upIcon from "../../../../assets/article-upIcon.svg";
import commentIcon from "../../../../assets/article-commentIcon.svg";
import shareIcon from "../../../../assets/article-shareIcon.svg";
import writeArticleIcon from "../../../../assets/article-writeArticleIcon.svg";
import upTriangle from "../../../../assets/article-upTriangleIcon.svg";

import CommentBox from "./comment/CommentBox";
import ShareModal from "./ShareModal";
import RelatedArticles from "./RelatedArticles";

import {
  addLike,
  deleteArticle,
  deleteLike,
  useArticle,
} from "../../../../API/ArticleAPI";
import { useComments } from "../../../../API/CommentAPI";
import { useNavigate } from "react-router-dom";
import { useMyProfile } from "../../../../API/UserAPI";

const Wrapper = styled.div<{ $isMyArticle: boolean }>`
  .auth {
    ${(props) => {
      if (props.$isMyArticle) {
        return css``;
      } else {
        return css`
          display: none;
        `;
      }
    }}
  }
`;
const ArticleTopButtons = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 0 14px;
  box-sizing: border-box;
  position: relative;
  button {
    min-width: 46px;
    height: 36px;
    padding: 0 12px 0 6px;
    font-size: 13px;
    line-height: 36px;
    border: 1px solid transparent;
    border-radius: 6px;
    background: #eff0f2;
    color: #000;
    font-weight: 700;
    position: relative;
    cursor: pointer;
    & > img {
      width: 20px;
      position: relative;
      top: 5px;
    }
    &.nextArticle img {
      rotate: calc(180deg);
    }
    &.articleList {
      padding: 0 12px;
    }
    & > a {
      width: 100%;
    }
  }

  .left {
    display: inline-block;
    position: absolute;
    left: 0;
    & > button:not(:first-child) {
      margin-left: 10px;
    }
  }
  .right {
    display: inline-block;
    position: absolute;
    right: 0;
    & > button:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
const ArticleBox = styled.div`
  padding: 29px 29px 0;
  box-sizing: border-box;
  border: 1px solid #ebecef;
  border-radius: 6px;
`;
const ArticleHeader = styled.div`
  margin: 0px 0px 20px;
  padding: 0px 0px 20px;
  border-bottom: 1px solid #ebecef;
  & > .board {
    text-align: left;
    & > a {
      color: #03c75a;
      font-size: 13px;
      position: relative;
      &::after {
        position: absolute;
        right: -8px;
        top: 5px;
        content: "";
        width: 8px;
        height: 8px;
        border-top: 1.5px solid #03c75a;
        border-right: 1.5px solid #03c75a;
        border-radius: 1px;
        box-sizing: border-box;
        transform: rotate(45deg);
      }
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    margin: 0px 0px 10px;
    text-align: left;
  }
  .info {
    min-height: 37px;
    box-sizing: border-box;
    position: relative;
    & > .left {
      display: grid;
      position: absolute;
      left: 0;
      display: flex;
      & > .thumbArea img {
        width: 36px;
        height: 36px;
        box-sizing: border-box;
      }
      & > .authorArea {
        text-align: left;
        margin-left: 8px;
        & > .authorName {
          font-size: 13px;
          font-weight: 700;
          margin: 0px 0px 6px;
        }
        & > .articleInfo {
          color: #979797;
          font-size: 12px;
          line-height: 13px;
          margin-right: 8px;
          & > .createdAt {
            margin-right: 8px;
          }
        }
      }
    }
    & > .right {
      display: flex;
      position: absolute;
      right: 0;
      button {
        background: inherit;
        border: none;
        outline: none;
        vertical-align: top;
        font-size: 13px;
        line-height: 18px;
        cursor: pointer;
      }
      & > .comments {
        display: flex;
        margin-right: 16px;
        img {
          width: 17px;
          height: 17px;
          margin-right: 2px;
        }
      }
      & > .copyURL {
        /* margin-right: 16px; */
      }
      /* & > .menu {
        width: 16px;
        height: 16px;
      } */
    }
  }
`;
const ArticleBody = styled.div`
  font-size: 15px;
  text-align: left;
`;
const ArticleFooter = styled.div`
  border-bottom: 1px solid #ebecef;
  & > .aboutAuthor {
    text-align: left;
    min-height: 36px;
    margin: 40px 0 26px;
    box-sizing: border-box;
    a {
      display: inline-flex;
      align-items: center;

      img {
        width: 36px;
        height: 36px;
        box-sizing: border-box;
      }
      span {
        font-size: 13px;
        font-weight: 400;
        padding-left: 8px;
        position: relative;
        &::after {
          position: absolute;
          right: -9px;
          top: 6px;
          content: "";
          width: 8px;
          height: 8px;
          border-top: 1.5px solid #000;
          border-right: 1.5px solid #000;
          border-radius: 1px;
          box-sizing: border-box;
          transform: rotate(45deg);
        }
      }
    }
  }
  & > .articleInfo {
    min-height: 20px;
    margin-bottom: 27px;
    line-height: 19px;
    font-size: 13px;
    position: relative;
    button {
      border: transparent;
      background: inherit;
      cursor: pointer;
    }
    & > .left {
      display: flex;
      position: absolute;
      left: 0;
      & > .likes,
      .comments {
        display: flex;
        img {
          width: 17px;
          height: 17px;
          margin-right: 2px;
        }
      }
    }
    & > .right {
      display: flex;
      position: absolute;
      right: 0;
      & > .share {
        display: flex;
        img {
          width: 17px;
          height: 17px;
          margin-right: 8px;
        }
      }
    }
  }
`;
const ArticleBottomButtons = styled.div`
  padding: 14px 0px 0px;
  height: 50px;
  box-sizing: border-box;
  position: relative;
  button {
    min-width: 46px;
    height: 36px;
    padding: 0 12px;
    font-size: 13px;
    line-height: 36px;
    border: 1px solid transparent;
    border-radius: 6px;
    background: #eff0f2;
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }
  & > .left {
    display: flex;
    position: absolute;
    left: 0;
    & > button:not(:first-child) {
      margin-left: 10px;
    }
    & > .writeArticle {
      display: flex;
      align-items: center;
      background: rgba(3, 199, 90, 0.12);
      color: #009f47;
      img {
        width: 17px;
        height: 17px;
        margin-right: 2px;
      }
    }
  }
  & > .right {
    display: flex;
    position: absolute;
    right: 0;
    & > button:not(:first-child) {
      margin-left: 10px;
    }
    & > .scrollTop {
      display: flex;
      align-items: center;
      img {
        width: 17px;
        height: 17px;
        margin-right: 2px;
      }
    }
  }
`;
const AdvertArea = styled.div`
  position: relative;
  overflow: hidden;
  margin: 24px 0 30px;
  padding: 1px;
  border-radius: 6px;
  border: 1px solid #ebecef;
`;

const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { article, refetchArticle } = useArticle(Number(articleId));
  const { comments, refetchComments } = useComments(Number(articleId));
  console.log(article);
  // 좋아요 설정
  const [isArticleLiked, setIsArticleLiked] = useState<boolean>(false);
  useEffect(() => {
    if (article) {
      console.log(article.isLiked);
      setIsArticleLiked(article.isLiked);
    }
  }, [article]);

  const { myProfile } = useMyProfile();
  const isMyArticle = useMemo(() => {
    if (article && myProfile) {
      return myProfile?.nickname === article?.article.author.nickname;
    } else {
      return false;
    }
  }, [article, myProfile]);
  // TOP 버튼을 눌렀을 때 위로 스크롤합니다.
  const TopButtonsRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    if (TopButtonsRef.current) {
      TopButtonsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // 댓글 버튼을 눌렀을 때 아래로 스크롤합니다.
  const CommentsRef = useRef<HTMLDivElement>(null);
  const scrollToComments = () => {
    if (CommentsRef.current) {
      CommentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // 현재 주소를 클립보드에 복사합니다.
  const location = useLocation();
  const handleCopyPathToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log(err);
    }
  };

  // 공유 버튼을 눌렀을 때 공유 모달이 뜹니다.
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // 좋아요 기능을 다룹니다.
  const handleLikes = async () => {
    if (myProfile === null) {
      if (
        confirm(
          "이 기능은 로그인해야만 사용할 수 있습니다.\n로그인하시겠습니까?"
        ) === true
      ) {
        navigate("/login");
      }
    } else {
      if (isArticleLiked) {
        // 이미 좋아요 -> 좋아요 취소 인 경우
        setIsArticleLiked(false);
        await deleteLike(Number(articleId));
        // 추가로 좋아요 -1 -> article의 refetch로서..
        await refetchArticle();
      } else {
        // 새롭게 좋아요를 누르는 경우
        setIsArticleLiked(true);
        await addLike(Number(articleId));
        // 추가로 좋아요 +1 -> article의 refetch로서 전체 데이터 업데이트
        await refetchArticle();
      }
    }
  };

  // comment 개수 세기
  const commentCount = useMemo(() => {
    if (comments) {
      let count = comments.comments.length;
      for (let i = 0; i < comments.comments.length; i++) {
        if (comments.comments[i].recomments !== undefined) {
          count += comments.comments[i].recomments.length;
        }
      }
      return count;
    }
  }, [comments]);

  // 글 삭제 handle
  const handleDeleteArticle = async () => {
    alert("게시글을 삭제하시겠습니까?");
    await deleteArticle(Number(articleId))
      .then(() => {
        navigate(`/board/${article?.article.board.id}`);
      })
      .catch((err) => console.error(err));
  };

  if (article && article.article.content && articleId && comments) {
    return (
      <Wrapper $isMyArticle={isMyArticle}>
        <ArticleTopButtons ref={TopButtonsRef}>
          <div className="left">
            <button
              className="edit auth"
              onClick={() => {
                navigate(`/write?editMode=${true}`, {
                  state: {
                    articleId: article.article.id,
                    title: article.article.title,
                    content: article.article.content,
                    board: article.article.board,
                    allowComments: article.article.allowComments,
                    isNotification: article.article.isNotification,
                  },
                });
              }}
            >
              수정
            </button>
            <button
              className="delete auth"
              onClick={() => handleDeleteArticle()}
            >
              삭제
            </button>
          </div>
          <div className="right">
            {article.prevId ? (
              <button className="prevArticle">
                <img src={upIcon} alt="이전글" />
                <Link to={`/articles/${article.prevId}`}>이전글</Link>
              </button>
            ) : null}
            {article.nextId ? (
              <button className="nextArticle">
                <img src={upIcon} alt="다음글" />
                <Link to={`/articles/${article.nextId}`}>다음글</Link>
              </button>
            ) : null}
            <button className="articleList">
              <Link to={`/board/${article?.article.board.id}`}>목록</Link>
            </button>
          </div>
        </ArticleTopButtons>
        <ArticleBox>
          <ArticleHeader>
            <div className="board">
              <Link to={`/board/${article?.article.board.id}`}>
                {article?.article.board.name}
              </Link>
            </div>
            <h3 className="title">{article?.article.title}</h3>
            <div className="info">
              <div className="left">
                <div className="thumbArea">
                  <Link to={"/"}>
                    <img
                      src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77"
                      alt="작성자 프로필 사진"
                    />
                    {/* 프로필 사진에 대해 서버에서 이미지를 가져오는 것인가? */}
                  </Link>
                </div>
                <div className="authorArea">
                  <div className="authorName">
                    <Link to={`/users/${article?.article.author.id}`}>
                      {article?.article.author.nickname}
                    </Link>
                  </div>
                  <div className="articleInfo">
                    <span className="createdAt">
                      {article?.article.createdAt
                        .replace(/-/g, ".")
                        .replace(/T/, " ")
                        .replace(/.\d\d\d\d\d\d/, "")}
                    </span>
                    <span className="viewCount">
                      조회 {article?.article.viewCount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="right">
                <button className="comments" onClick={() => scrollToComments()}>
                  <img src={commentIcon} alt="댓글 아이콘" />
                  <span>
                    댓글 <strong>{commentCount}</strong>
                  </span>
                </button>
                <button
                  className="copyURL"
                  onClick={() => handleCopyPathToClipBoard(location.pathname)}
                >
                  URL 복사
                </button>
                {/* <button className="menu" /> */}
                {/* 메뉴 버튼도 있지만, 구현 기능이 포함되어 있지 않기 때문에 (지금 상황에선) 뺐습니다. */}
              </div>
            </div>
          </ArticleHeader>
          <ArticleBody>
            <div
              dangerouslySetInnerHTML={{ __html: article.article.content }}
            ></div>
          </ArticleBody>
          <ArticleFooter>
            <div className="aboutAuthor">
              <Link to={`/users/${article?.article.author.nickname}`}>
                <img
                  src="https://ssl.pstatic.net/static/cafe/cafe_pc/default/cafe_profile_77.png?type=c77_77"
                  alt="작성자 프로필 사진"
                />
                {/* 프로필 사진에 대해 서버에서 이미지를 가져오는 것인가? */}
                <span>
                  <strong>{article?.article.author.nickname}</strong>
                  님의 게시글 더보기
                </span>
              </Link>
            </div>
            <div className="articleInfo">
              <div className="left">
                <button className="likes" onClick={() => handleLikes()}>
                  <img
                    src={
                      isArticleLiked
                        ? "https://ca-fe.pstatic.net/web-section/static/img/ico-post-like-on-f-53535.svg?7eb6be9a4989d32af686acf09a07747d="
                        : "https://ca-fe.pstatic.net/web-section/static/img/ico-post-like-f-53535.svg?a37a11006a542ce9949c0dd6779345b8="
                    }
                    alt="좋아요 아이콘"
                  />
                  <span>
                    좋아요 <strong>{article?.article.likeCount}</strong>
                  </span>
                </button>
                <button className="comments">
                  <img src={commentIcon} alt="댓글 아이콘" />
                  <span>
                    댓글 <strong>{commentCount}</strong>
                  </span>
                </button>
              </div>
              <div className="right">
                <button
                  className="share"
                  onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                >
                  <img src={shareIcon} alt="공유 아이콘" />
                  <span>공유</span>
                </button>
                {isShareModalOpen ? (
                  <ShareModal
                    setIsShareModalOpen={setIsShareModalOpen}
                    handleCopyPathToClipBoard={handleCopyPathToClipBoard}
                  />
                ) : null}
              </div>
            </div>
          </ArticleFooter>
          <div className="comments" ref={CommentsRef}>
            {myProfile ? (
              <CommentBox
                articleId={articleId}
                comments={comments.comments}
                refetchComments={refetchComments}
              />
            ) : null}
          </div>
        </ArticleBox>
        <ArticleBottomButtons>
          <div className="left">
            {myProfile ? (
              <button
                className="writeArticle"
                onClick={() => {
                  navigate("/write");
                }}
              >
                <img src={writeArticleIcon} alt="글쓰기 아이콘" />
                <span>글쓰기</span>
              </button>
            ) : null}

            <button
              className="edit auth"
              onClick={() => {
                navigate(`/write?editMode=${true}`, {
                  state: {
                    articleId: article.article.id,
                    title: article.article.title,
                    content: article.article.content,
                    board: article.article.board,
                    allowComments: article.article.allowComments,
                    isNotification: article.article.isNotification,
                  },
                });
              }}
            >
              수정
            </button>
            <button
              className="delete auth"
              onClick={() => handleDeleteArticle()}
            >
              삭제
            </button>
          </div>
          <div className="right">
            <button
              className="articleList"
              onClick={() => {
                navigate(`/board/${article.article.board.id}`);
              }}
            >
              목록
            </button>
            <button className="scrollTop" onClick={() => scrollToTop()}>
              <img src={upTriangle} alt="위로 가기" />
              <span>TOP</span>
            </button>
          </div>
        </ArticleBottomButtons>
        <AdvertArea />
        <RelatedArticles
          articleId={articleId}
          boardId={article.article.board.id}
          boardName={article.article.board.name}
          scrollToTop={scrollToTop}
        />
      </Wrapper>
    );
  }
};
export default Article;
