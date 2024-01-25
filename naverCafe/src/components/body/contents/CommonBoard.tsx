//일반 게시판 (자유 게시판과 동일한 양식)

import { useEffect, useState } from "react";
import { useArticleList } from "../../../API/BoardAPI";
import { aList } from "../../../Constants";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import { BoardBottomOption } from "../../../contexts/BoardStyle/BoardBottomContext/BoardBottomOption";
import { usePagination } from "../../../contexts/BoardStyle/BoardBottomContext/PaginationContext";
import {
  Board,
  CommonBoardHeader,
} from "../../../contexts/BoardStyle/BoardHeaderContext";
import { CommonBoardTopOption } from "../../../contexts/BoardStyle/BoardTopOptionContext";
import { useNoticeContext } from "../../../contexts/BoardContext/NoticeContext";
import { Article } from "../../../Types";

const CommonBoard = ({ board }) => {
  const { articleList } = useArticleList(board.id);
  const { setIsNoticeOff } = useNoticeContext();
  const { setTotalLength, indexOfFirstItem, indexOfLastItem, setItemsPerPage, itemsPerPage } = usePagination(
    board.id
  );
  const [currentItems, setCurrentItems] = useState<{articles:Article[]}>({articles:[]});
  

  useEffect(() => {
    // setTotalLength(articleList ? articleList.length : 0);
    setTotalLength(aList.length);
    setIsNoticeOff(false);
    setItemsPerPage(15);
  }, [board]);

  useEffect(() => {
    const newItems = aList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems({ articles: newItems });
    console.log(newItems);
  },[articleList, itemsPerPage, indexOfFirstItem, indexOfLastItem])

  return (
    <>
      <Board>
        <CommonBoardHeader
          isFavorite={false}
          boardName={board.name}
        ></CommonBoardHeader>
        <CommonBoardTopOption boardId={board.id}></CommonBoardTopOption>
        <ArticleTable
          board={boardAttribute.CommonBoard}
          articleList={currentItems.articles}
        ></ArticleTable>
        <BoardBottomOption boardId={board.id}></BoardBottomOption>
      </Board>
    </>
  );
};
export default CommonBoard;
