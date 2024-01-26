// 인기글 게시판(인기글, 댓글 top, 좋아요 top, 세 가지 정렬로 이루어지는 듯 합니다.)
import { useContext, useEffect, useState } from "react";
import {
  Board,
  PopularBoardHeader,
} from "../../../contexts/BoardStyle/BoardHeaderContext";
import { useArticleList } from "../../../API/BoardAPI";
import { PopularBoardTopOption } from "../../../contexts/BoardStyle/BoardTopOptionContext";
import { PopularBoardBottomOption } from "../../../contexts/BoardStyle/BoardBottomContext/BoardBottomOption";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import { aList } from "../../../Constants";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";

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
    query: "VIEW",
  },
  {
    p: "댓글이",
    strong: "좋아요 TOP 게시글",
    nextIndex: 2,
    type: "댓글순",
    query: "COMMENT",
  },
  {
    p: "좋아요가",
    strong: "인기글",
    nextIndex: 0,
    type: "좋아요순",
    query: "LIKE",
  },
];

const PopularBoard = () => {
  const { setCurBoardState } = useContext(CurrentBoardContext);
  const [currentOrder, setCurrentOrder] = useState<Order>(orderList[0]);
  const { articleList } = useArticleList({ type: currentOrder.query });

  useEffect(() => {
    console.log(currentOrder);
  }, [currentOrder]);

  useEffect(() => {
    setCurBoardState(-1);
  },[])
  return (
    <>
      <Board>
        <PopularBoardHeader></PopularBoardHeader>
        <PopularBoardTopOption
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        ></PopularBoardTopOption>
        {currentOrder === orderList[2] ? (
          <ArticleTable
            board={boardAttribute.PopularBoard}
            articleList={aList} //articleList
            isLike={true}
          ></ArticleTable>
        ) : (
          <ArticleTable
            board={boardAttribute.PopularBoard}
            articleList={aList}
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
