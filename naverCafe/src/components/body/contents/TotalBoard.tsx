// 전체글 게시판

import { useContext, useEffect, useState } from "react";
import { aList } from "../../../Constants";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import { BoardBottomOption } from "../../../contexts/BoardStyle/BoardBottomContext/BoardBottomOption";
import { usePagination } from "../../../contexts/BoardStyle/BoardBottomContext/PaginationContext";
import {
  Board,
  TotalBoardHeader,
} from "../../../contexts/BoardStyle/BoardHeaderContext";
import { TotalBoardTopOption } from "../../../contexts/BoardStyle/BoardTopOptionContext";
import { ArticleType } from "../../../Types";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";
import { wholeArticle } from "../../../API/ArticleAPI";

const TotalBoard = () => {
  const { setCurBoardState } = useContext(CurrentBoardContext);
  const {
    articleLength,
    setTotalLength,
    indexOfFirstItem,
    indexOfLastItem,
    itemsPerPage,
    updatePagination,
    currentPage,
  } = usePagination(0);
  const articleList = wholeArticle(); //전체 게시물 리스트
  const [currentItems, setCurrentItems] = useState<{ articles: ArticleType[] }>(
    {
      articles: [],
    }
  );

  useEffect(() => {
    // setTotalLength(articleList ? articleList.length : 0);
    setTotalLength(aList.length);
    setCurBoardState(0);
    console.log(articleLength);
  }, []);

  useEffect(() => {
    const newItems = aList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems({ articles: newItems });
    updatePagination({ boardId: 0, currentPage: currentPage });
    console.log(currentPage);
  }, [itemsPerPage]);

  return (
    <>
      <Board>
        <TotalBoardHeader></TotalBoardHeader>
        <TotalBoardTopOption
          articleLength={articleLength}
        ></TotalBoardTopOption>
        <ArticleTable
          board={boardAttribute.TotalBoard}
          articleList={currentItems.articles} //articleList
        ></ArticleTable>
        <BoardBottomOption boardId={0}></BoardBottomOption>
      </Board>
    </>
  );
};

export default TotalBoard;
