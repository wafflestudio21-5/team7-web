import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import newArticleIcon from "../../../../assets/relatedArticle-newArticleIcon.svg";
import { getArticleList } from "../../../../API/BoardAPI";
import { ArticleBriefType, ArticleType } from "../../../../Types";

const Wrapper = styled.div`
  position: relative;
  margin: 30px 12px 0;
  font-size: 13px;
  & > h2 {
    margin: 0 0 11px;
    font-size: 17px;
    text-align: left;
  }
  & > .pageButtons {
    display: flex;
    justify-content: center;
    position: relative;
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
    button:hover {
      background-color: #f0f0f0;
    }
    & > li > .active {
      font-weight: 700;
      background-color: #e5e7ea;
      &:hover {
        background-color: #d8d9dc;
      }
    }
  }
`;
const RelatedArticle = styled.li<{ $isArticleFocused: boolean }>`
  display: flex;
  position: relative;
  padding: 10px 0px 8px 4px;
  border-top: 1px solid #f2f2f2;
  background-color: ${(props) =>
    props.$isArticleFocused ? "#f9f9fa" : "inherit"};
  & > a > .title {
    display: inline-block;
    width: 608px;
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

// 로컬에서 테스트를 위한 데이터입니다.
// const exampleArticleList = {
//   articles: [
//     {
//       id: 1,
//       title: "와플 카페 waffle cafe 카페를 시작합니다.",
//       createdAt: "2024-01-12T12:34:56",
//       viewCnt: 100,
//       likeCnt: 5,
//       comment_count: 10,
//       user: {
//         id: 1,
//         nickname: "허유민",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 2,
//       title: "출석",
//       createdAt: "2024-01-13T01:30:01",
//       viewCnt: 21,
//       likeCnt: 1,
//       comment_count: 0,
//       user: {
//         id: 2,
//         nickname: "황두현",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 3,
//       title: "안녕하세요",
//       createdAt: "2024-01-14T23:19:40",
//       viewCnt: 10,
//       likeCnt: 3,
//       comment_count: 2,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 4,
//       title: "잘 부탁드립니다.ㅎㅎ 개발 열심히 해봐요!",
//       createdAt: "2024-01-14T23:50:59",
//       viewCnt: 9,
//       likeCnt: 2,
//       comment_count: 1,
//       user: {
//         id: 2,
//         nickname: "황두현",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 5,
//       title: "React useRef 관련 질문이 있습니다.",
//       createdAt: "2024-01-15T07:12:34",
//       viewCnt: 3,
//       likeCnt: 1,
//       comment_count: 9,
//       user: {
//         id: 4,
//         nickname: "빠니보틀",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 6,
//       title: "프런트 백 모두 파이팅입니다!",
//       createdAt: "2024-01-17T09:07:40",
//       viewCnt: 2,
//       likeCnt: 0,
//       comment_count: 0,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 7,
//       title: "페이지네이션 알고리즘 헷갈리네용",
//       createdAt: "2024-01-17T10:17:34",
//       viewCnt: 3,
//       likeCnt: 9,
//       comment_count: 1,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 8,
//       title: "누구냐 넌",
//       createdAt: "2024-01-17T19:19:10",
//       viewCnt: 4,
//       likeCnt: 2,
//       comment_count: 0,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 9,
//       title: "와플 맛있습니다.",
//       createdAt: "2024-01-17T20:25:11",
//       viewCnt: 10,
//       likeCnt: 3,
//       comment_count: 1,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 10,
//       title: "이것은 테스트입니다.",
//       createdAt: "2024-01-17T22:22:01",
//       viewCnt: 2,
//       likeCnt: 0,
//       comment_count: 3,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//     {
//       id: 11,
//       title: "이것도 테스트입니다.",
//       createdAt: "2024-01-17T23:23:31",
//       viewCnt: 2,
//       likeCnt: 1,
//       comment_count: 3,
//       user: {
//         id: 3,
//         nickname: "조현우",
//       },
//       board: {
//         board_id: 1,
//         board_name: "Free",
//       },
//       allowComments: true,
//       isNotification: false,
//     },
//   ],
// };

interface PropsRelatedArticles {
  articleId: string | undefined;
  boardId: number;
  boardName: string;
  scrollToTop: () => void;
}
const RelatedArticles = ({
  articleId,
  boardId,
  boardName,
  scrollToTop,
}: PropsRelatedArticles) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // pageNumber가 바뀔 때 articleList를 설정합니다.
  const [articleList, setArticleList] = useState<ArticleBriefType | null>(null);
  useEffect(() => {
    getArticleList({ boardId: boardId, page: pageNumber, size: 5 }).then(
      (res) => {
        setArticleList(res);
        setTotalPages(res.totalPages);
      }
    );
  }, [pageNumber]);

  // 맨 처음, 보고 있는 article이 포함된 page를 찾습니다.
  const findArticlePage = useCallback(async () => {
    for (let i = 0; i < totalPages; i++) {
      const data = await getArticleList({
        boardId: boardId,
        page: i + 1,
        size: 5,
      });
      if (
        data.content.filter(
          (article: ArticleType) => article.id === Number(articleId)
        ).length !== 0
      ) {
        return i + 1;
      } else {
        continue;
      }
    }
  }, [totalPages, articleId]);

  useEffect(() => {
    findArticlePage().then((res) => {
      if (res) {
        setPageNumber(res);
      }
    });
  }, [totalPages, articleId]);

  // pagination button 들입니다.
  const pageButtons = Array.from({ length: totalPages }).map((_, index) => {
    return totalPages === 1 ? null : (
      <li key={index} className="pageButtonWrap">
        <button
          className={
            pageNumber === index + 1 ? "pageButton active" : "pageButton"
          }
          onClick={() => setPageNumber(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    );
  });

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

  // 페이지네이션 관련 리팩토링...
  const relatedArticleList = useMemo(() => {
    return articleList?.content.map((article) => (
      <RelatedArticle
        $isArticleFocused={Number(articleId) === article.id ? true : false}
        key={article.id}
      >
        <Link
          to={`/articles/${article.id}`}
          onClick={() => {
            scrollToTop();
          }}
        >
          <div className="title">
            {article.title}
            <span className="commentCount">
              {/* {article. !== 0 ? ` [${article.comment_count}]` : ""} */}
              {/* article 데이터 내부에 comment count도 있어야겠음! */}
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
          <div className="authorNickname">{article.author.nickname}</div>
          <div className="createdAt">
            {article.createdAt.replace(/-/g, ". ").replace(/T.*/, "")}
          </div>
        </div>
      </RelatedArticle>
    ));
  }, [articleId, articleList, scrollToTop]);

  return (
    <Wrapper>
      <h2>"{boardName}" 게시판 글</h2>
      <div>{relatedArticleList}</div>
      <ul className="pageButtons">{pageButtons}</ul>
    </Wrapper>
  );
};
export default RelatedArticles;
