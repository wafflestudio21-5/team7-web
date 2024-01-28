//일반 게시판 (자유 게시판과 동일한 양식)

import { useContext, useEffect, useState } from "react";
import {
  useArticleList,
  useGetLikeBoard,
  useWholeBoard,
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


//처음 즐겨찾기 설정된 게시판 리스트를 받는 함수
const useInitalFavList = () => {
  const { favList } = useGetLikeBoard();
  const { boardList } = useWholeBoard();
  const boolFavList: boolean[] = [];

  for (let i = 1; i <= boardList!.boards.length; i++) {
    for (let j = 1; j <= favList!.boards.length; j++) {
      const isFav = boardList!.boards[i] === favList!.boards[j];
      boolFavList.push(isFav);
    }
  }

  return boolFavList;
};

const CommonBoard = ({ board }: { board: BoardType }) => {
  const { id } = board;
  const { setCurBoardState } = useContext(CurrentBoardContext);
  const { articleList } = useArticleList({ boardId: id });
  const { setIsNoticeOff } = useNoticeContext();
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

  //isfavorite을 api로 받아오면 됨

  useEffect(() => {
    // setTotalLength(articleList ? articleList.length : 0);
    setTotalLength(aList.length);
    setIsNoticeOff(false);
    setItemsPerPage(15);
    setCurBoardState(id);
  }, [board]);

  useEffect(() => {
    const newItems = aList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems({ articles: newItems });
    console.log(newItems);
  }, [articleList, itemsPerPage, indexOfFirstItem, indexOfLastItem]);

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
