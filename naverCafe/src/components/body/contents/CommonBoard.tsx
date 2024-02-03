//일반 게시판 (자유 게시판과 동일한 양식)

import { useContext, useEffect, useState } from "react";
import { getArticleList, useGetLikeBoard } from "../../../API/BoardAPI";
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
import { ArticleBriefType, ArticleType, BoardType } from "../../../Types";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";
import { ViewOptionContext } from "../../../contexts/BoardContext/ViewOptionContext";
import { useMyProfile } from "../../../API/UserAPI";

const CommonBoard = ({ board }: { board: BoardType }) => {
  const { myProfile } = useMyProfile();
  const { setIsNoticeOff } = useNoticeContext();
  const { setViewOp } = useContext(ViewOptionContext);
  const { refetch } = useGetLikeBoard();
  const { setCurBoardState } = useContext(CurrentBoardContext);

  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const { size, page, sort, setSize, setPage, setSort, setTotPage } =
    usePagination();
  
  async function fetchArticles() {
    try {
      const fetchedArticles: ArticleBriefType = await getArticleList({
        boardId: board.id,
        size,
        page,
        sort,
      });
      setArticleList(fetchedArticles.content);
      setTotPage(fetchedArticles.totalPages);
    } catch (err) {
      console.log("Error fetching article list in CommonBoard");
    }
  }

  useEffect(() => {
    setCurBoardState(board.id);
    setIsNoticeOff(false);
    setSize(15);
    setPage(1);
    setSort("");
    setViewOp(2);
    if (myProfile) {
      refetch();
    }
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, myProfile]);

  useEffect(() => {
    setPage(1);
  }, [size]);

  useEffect(() => {
    fetchArticles();
    //console.log(articleList);
  }, [board, size, page, sort, setTotPage]);

  return (
    <>
      <Board>
        <CommonBoardHeader board={board}></CommonBoardHeader>
        <CommonBoardTopOption boardId={board.id}></CommonBoardTopOption>
        <ArticleTable
          board={boardAttribute.CommonBoard}
          articleList={articleList}
        ></ArticleTable>
        <BoardBottomOption boardId={board.id}></BoardBottomOption>
      </Board>
    </>
  );
};
export default CommonBoard;
