// 인기글 게시판(인기글, 댓글 top, 좋아요 top, 세 가지 정렬로 이루어지는 듯 합니다.)
import { useContext, useEffect, useState } from "react";
import {
  Board,
  PopularBoardHeader,
} from "../../../contexts/BoardStyle/BoardHeaderContext";
import { hotArticle } from "../../../API/ArticleAPI";
import { PopularBoardTopOption } from "../../../contexts/BoardStyle/BoardTopOptionContext";
import { PopularBoardBottomOption } from "../../../contexts/BoardStyle/BoardBottomContext/BoardBottomOption";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";
import { ArticleBriefType, ArticleType } from "../../../Types";

export type Order = {
  p: string;
  strong: string;
  nextIndex: number;
  type: string;
  query: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const orderList: Order[] = [
  {
    p: "인기가",
    strong: "댓글 TOP 게시글",
    nextIndex: 1,
    type: "인기순",
    query: "viewCnt",
  },
  {
    p: "댓글이",
    strong: "좋아요 TOP 게시글",
    nextIndex: 2,
    type: "댓글순",
    query: "commentCnt",
  },
  {
    p: "좋아요가",
    strong: "인기글",
    nextIndex: 0,
    type: "좋아요순",
    query: "likeCnt",
  },
];

const PopularBoard = () => {
  const { setCurBoardState } = useContext(CurrentBoardContext);
  const [currentOrder, setCurrentOrder] = useState<Order>(orderList[0]);
  const SortOption = [{view:"최근 7일", query:"WEEK"}, {view:"최근 30일",query:"MONTH"},{view: "전체", query:"ALL"}];
  const [selectedOp, setSelectedOp] = useState(0); //선택된 SortOption의 인덱스

  const [articleList, setArticleList] = useState<ArticleType[]>([]);

  useEffect(() => {
    //console.log(currentOrder);
    async function fetchPopArticle() {
      try {
        const fetchedArticles: ArticleBriefType = await hotArticle(currentOrder.query, SortOption[selectedOp].query);
        setArticleList(fetchedArticles.content);
      } catch (err) {
        console.log('Error fetching in PopularBoard');
      }
    }

    fetchPopArticle();
  }, [currentOrder, selectedOp]);

  useEffect(() => {
    setCurBoardState(-1);
  }, []);


  return (
    <>
      <Board>
        <PopularBoardHeader></PopularBoardHeader>
        <PopularBoardTopOption
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          SortOption={SortOption}
          selectedOp={selectedOp}
          setSelectedOp={setSelectedOp}
        ></PopularBoardTopOption>
        {currentOrder === orderList[2] ? (
          <ArticleTable
            board={boardAttribute.PopularBoard}
            articleList={articleList} //articleList
            isLike={true}
          ></ArticleTable>
        ) : (
          <ArticleTable
            board={boardAttribute.PopularBoard}
            articleList={articleList}
            isLike={false}
          ></ArticleTable>
        )}
        <PopularBoardBottomOption
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        ></PopularBoardBottomOption>
      </Board>
    </>
  );
};
export default PopularBoard;
