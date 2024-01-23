import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import newArticleIcon from "../../../../assets/relatedArticle-newArticleIcon.svg";

const Wrapper = styled.div`
  position: relative;
  margin: 30px 12px 0;
  font-size: 13px;
  & > h2 {
    margin: 0 0 11px;
    font-size: 17px;
    text-align: left;
  }
`;
const Article = styled.li<{ $isArticleFocused: boolean }>`
  display: flex;
  position: relative;
  padding: 10px 0px 8px 4px;
  border-top: 1px solid #f2f2f2;
  background-color: ${(props) =>
    props.$isArticleFocused ? "#f9f9fa" : "inherit"};
  & > a > .title {
    display: inline-block;
    /* width: 608px; */
    position: relative;
    text-align: left;
    overflow: hidden;
    font-weight: ${(props) => (props.$isArticleFocused ? 700 : "inherit")};
    & > .commentCount {
      color: #ff2f3b;
      font-weight: 700;
    }
    & > .newArticle {
      display: inline-block;
      width: 13px;
      height: 13px;
      margin-left: 2px;
      position: relative;
      & > img {
        position: relative;
        top: 1px;
      }
    }
  }
  & > .right {
    position: absolute;
    right: 0;
    & > .authorNickname {
      display: inline-block;
      padding: 0 0 0 24px;
      text-align: left;
      color: #676767;
    }
    & > .createdAt {
      display: inline-block;
      color: #676767;
      padding-left: 100px;
    }
  }
`;
const ArticleListContainer = styled.div<{
  $articleListOnActive: number | null;
}>`
  & > .buttons {
    button {
      background-color: inherit;
      border: none;
      font-size: 13px;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      box-sizing: border-box;
      margin: 0 4px;
    }
  }

  ${(props) => {
    if (props.$articleListOnActive === 1) {
      return css`
        & > .buttons {
          button {
            &:not(.firstButton):hover {
              background-color: #f0f0f0;
            }
          }
          & > .firstButton {
            font-weight: 700;
            background-color: #e5e7ea;
            &:hover {
              background-color: #d8d9dc;
            }
          }
        }
        & > .relatedArticleList:not(.first) {
          display: none;
        }
      `;
    } else if (props.$articleListOnActive === 2) {
      return css`
        & > .buttons {
          button {
            &:not(.secondButton):hover {
              background-color: #f0f0f0;
            }
          }
          & > .secondButton {
            font-weight: 700;
            background-color: #e5e7ea;
            &:hover {
              background-color: #d8d9dc;
            }
          }
        }
        & > .relatedArticleList:not(.second) {
          display: none;
        }
      `;
    } else if (props.$articleListOnActive === 3) {
      return css`
        & > .buttons {
          button {
            &:not(.thirdButton):hover {
              background-color: #f0f0f0;
            }
          }
          & > .thirdButton {
            font-weight: 700;
            background-color: #e5e7ea;
            &:hover {
              background-color: #d8d9dc;
            }
          }
        }
        & > .relatedArticleList:not(.third) {
          display: none;
        }
      `;
    } else {
      return css``;
    }
  }}
`;

// 로컬에서 테스트를 위한 데이터입니다.
const exampleArticleList = {
  articles: [
    {
      id: 1,
      title: "와플 카페 waffle cafe 카페를 시작합니다.",
      createdAt: "2024-01-12T12:34:56",
      viewCnt: 100,
      likeCnt: 5,
      comment_count: 10,
      user: {
        id: 1,
        nickname: "허유민",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 2,
      title: "출석",
      createdAt: "2024-01-13T01:30:01",
      viewCnt: 21,
      likeCnt: 1,
      comment_count: 0,
      user: {
        id: 2,
        nickname: "황두현",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 3,
      title: "안녕하세요",
      createdAt: "2024-01-14T23:19:40",
      viewCnt: 10,
      likeCnt: 3,
      comment_count: 2,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 4,
      title: "잘 부탁드립니다.ㅎㅎ 개발 열심히 해봐요!",
      createdAt: "2024-01-14T23:50:59",
      viewCnt: 9,
      likeCnt: 2,
      comment_count: 1,
      user: {
        id: 2,
        nickname: "황두현",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 5,
      title: "React useRef 관련 질문이 있습니다.",
      createdAt: "2024-01-15T07:12:34",
      viewCnt: 3,
      likeCnt: 1,
      comment_count: 9,
      user: {
        id: 4,
        nickname: "빠니보틀",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 6,
      title: "프런트 백 모두 파이팅입니다!",
      createdAt: "2024-01-17T09:07:40",
      viewCnt: 2,
      likeCnt: 0,
      comment_count: 0,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 7,
      title: "페이지네이션 알고리즘 헷갈리네용",
      createdAt: "2024-01-17T10:17:34",
      viewCnt: 3,
      likeCnt: 9,
      comment_count: 1,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 8,
      title: "누구냐 넌",
      createdAt: "2024-01-17T19:19:10",
      viewCnt: 4,
      likeCnt: 2,
      comment_count: 0,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 9,
      title: "와플 맛있습니다.",
      createdAt: "2024-01-17T20:25:11",
      viewCnt: 10,
      likeCnt: 3,
      comment_count: 1,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 10,
      title: "이것은 테스트입니다.",
      createdAt: "2024-01-17T22:22:01",
      viewCnt: 2,
      likeCnt: 0,
      comment_count: 3,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
    {
      id: 11,
      title: "이것도 테스트입니다.",
      createdAt: "2024-01-17T23:23:31",
      viewCnt: 2,
      likeCnt: 1,
      comment_count: 3,
      user: {
        id: 3,
        nickname: "조현우",
      },
      board: {
        board_id: 1,
        board_name: "Free",
      },
      allowComments: true,
      isNotification: false,
    },
  ],
};

interface PropsRelatedArticles {
  articleId: string | undefined;
}
const RelatedArticles = ({ articleId }: PropsRelatedArticles) => {
  const [onActiveButtonNumber, setOnActiveButtonNumber] = useState<
    number | null
  >(1);
  // article이 새로운 article인지 아닌지 판단하는 함수입니다.
  const isNewArticle = (createdAt: string) => {
    const dateNow = new Date();
    const createdYear = Number(createdAt.substring(0, 4));
    const createdMonth = Number(createdAt.substring(5, 7));
    const createdDay = Number(createdAt.substring(8, 10));
    if (
      dateNow.getFullYear() === createdYear &&
      dateNow.getMonth() + 1 === createdMonth &&
      dateNow.getDate() - createdDay <= 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const relatedArticleList = useMemo(() => {
    return exampleArticleList.articles.map((article) => (
      <Article
        $isArticleFocused={Number(articleId) === article.id ? true : false}
        key={article.id}
      >
        <Link
          to={`/articles/${article.id}`}
          onClick={() => setOnActiveButtonNumber(1)}
        >
          <div className="title">
            {article.title}
            <span className="commentCount">
              {article.comment_count !== 0 ? ` [${article.comment_count}]` : ""}
            </span>
            <span
              className={
                isNewArticle(article.createdAt) ? "newArticle" : "oldArticle"
              }
            >
              {isNewArticle(article.createdAt) ? (
                <img src={newArticleIcon} alt="새로운 게시물" />
              ) : (
                ""
              )}
            </span>
          </div>
        </Link>
        <div className="right">
          <div className="authorNickname">{article.user.nickname}</div>
          <div className="createdAt">
            {article.createdAt
              .replace(/-/g, ". ")
              .replace(/T\d\d:\d\d:\d\d/, ".")}
          </div>
        </div>
      </Article>
    ));
  }, [articleId]);
  const handleRelatedArticleList = () => {
    // 최종적으로 리턴할 article 배열이 담긴 JSX.Element 입니다.
    const newRelatedArticles = (upperLimitIndex: number) => {
      if (upperLimitIndex >= 10) {
        return (
          <ArticleListContainer $articleListOnActive={onActiveButtonNumber}>
            <ul className="relatedArticleList third">
              {relatedArticleList
                .slice(
                  upperLimitIndex - 14 < 0 ? 0 : upperLimitIndex - 14,
                  upperLimitIndex - 9
                )
                .reverse()}
            </ul>
            <ul className="relatedArticleList second">
              {relatedArticleList
                .slice(upperLimitIndex - 9, upperLimitIndex - 4)
                .reverse()}
            </ul>
            <ul className="relatedArticleList first">
              {relatedArticleList
                .slice(upperLimitIndex - 4, upperLimitIndex + 1)
                .reverse()}
            </ul>
            <div className="buttons">
              <button
                className="firstButton"
                onClick={() => setOnActiveButtonNumber(1)}
              >
                1
              </button>
              <button
                className="secondButton"
                onClick={() => setOnActiveButtonNumber(2)}
              >
                2
              </button>
              <button
                className="thirdButton"
                onClick={() => setOnActiveButtonNumber(3)}
              >
                3
              </button>
            </div>
          </ArticleListContainer>
        );
      } else if (5 <= upperLimitIndex && upperLimitIndex < 10) {
        return (
          <ArticleListContainer $articleListOnActive={onActiveButtonNumber}>
            <ul className="relatedArticleList second">
              {relatedArticleList.slice(0, upperLimitIndex - 4).reverse()}
            </ul>
            <ul className="relatedArticleList first">
              {relatedArticleList
                .slice(upperLimitIndex - 4, upperLimitIndex + 1)
                .reverse()}
            </ul>
            <div className="buttons">
              <button
                className="firstButton"
                onClick={() => setOnActiveButtonNumber(1)}
              >
                1
              </button>
              <button
                className="secondButton"
                onClick={() => setOnActiveButtonNumber(2)}
              >
                2
              </button>
            </div>
          </ArticleListContainer>
        );
      } else {
        return (
          <ArticleListContainer $articleListOnActive={onActiveButtonNumber}>
            <ul className="relatedArticleList first">
              {relatedArticleList
                .slice(
                  upperLimitIndex - 4 < 0 ? 0 : upperLimitIndex - 4,
                  upperLimitIndex === 2
                    ? 5
                    : upperLimitIndex === 3
                    ? 5
                    : upperLimitIndex + 1
                )
                .reverse()}
            </ul>
          </ArticleListContainer>
        );
      }
    };
    if (articleId) {
      // 현재 보고 있는 article이 전체 article list에서 몇번째 index에 있는지 조사합니다.
      const articleIndex = exampleArticleList.articles.findIndex(
        (article) => article.id === Number(articleId)
      );
      // 보여줄 related article index의 '상한'(더욱 최신글)을 조사하고, 이에 따라 pagination button 개수와 보여줄 article을 정합니다.
      if (exampleArticleList.articles[articleIndex + 2] !== undefined) {
        return newRelatedArticles(articleIndex + 2);
      } else if (exampleArticleList.articles[articleIndex + 1] !== undefined) {
        return newRelatedArticles(articleIndex + 1);
      } else {
        return newRelatedArticles(articleIndex);
      }
    } else {
      return null;
    }
  };

  return (
    <Wrapper>
      <h2>전체글</h2>
      <div>{handleRelatedArticleList()}</div>
    </Wrapper>
  );
};
export default RelatedArticles;
