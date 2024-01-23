//일반 게시판 (자유 게시판과 동일한 양식)

import { useEffect } from "react";
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

const CommonBoard = ({ board }) => {
  const { articleList } = useArticleList(board.id);
  const { setTotalLength, indexOfFirstItem, indexOfLastItem,  } = usePagination(
    board.id
  );
  const currentItems = articleList?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // setTotalLength(articleList ? articleList.length : 0);
    setTotalLength(aList.length * 2);
  }, []);

  return (
    <>
      <Board>
        <CommonBoardHeader isFavorite={false}></CommonBoardHeader>
        <CommonBoardTopOption></CommonBoardTopOption>
        <ArticleTable
          board={boardAttribute.CommonBoard}
          articleList={aList} //currentItems
        ></ArticleTable>
        <BoardBottomOption boardId={board.id}></BoardBottomOption>
      </Board>
    </>
  );
};
export default CommonBoard;
