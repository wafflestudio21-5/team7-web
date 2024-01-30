//일반 게시판 (자유 게시판과 동일한 양식)

import { useContext, useEffect, useState } from "react";
import {
  useArticleList,
  useGetLikeBoard,
} from "../../../API/BoardAPI";
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
import { ArticleType, BoardType } from "../../../Types";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";

const CommonBoard = ({ board }: { board: BoardType }) => {
  const { id } = board;

  const { setIsNoticeOff } = useNoticeContext(); //공지 토글

  const { refetch } = useGetLikeBoard();

  const { setCurBoardState } = useContext(CurrentBoardContext);
  const { articleList } = useArticleList({ boardId: id });
  const {
    setTotalLength,
    indexOfFirstItem,
    indexOfLastItem,
    setItemsPerPage,
    itemsPerPage,
  } = usePagination(id);
  const [currentItems, setCurrentItems] = useState<{ articles: ArticleType[] }>(
    { articles: [] }
  );
  useEffect(() => {
    const newItems = aList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems({ articles: newItems });
  }, [articleList, itemsPerPage, indexOfFirstItem, indexOfLastItem]);

  //보드가 바뀔 때마다
  useEffect(() => {
    // setTotalLength(articleList ? articleList.length : 0);
    setTotalLength(aList.length);
    setItemsPerPage(15);
    setCurBoardState(id);

    setIsNoticeOff(false); //보드가 바뀔 때마다 notice 토글 초기화

  }, [board]);

  useEffect(() => {
    refetch();
  },[])


  return (
    <>
      <Board>
        <CommonBoardHeader
          board={board}
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
