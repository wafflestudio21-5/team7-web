// 전체글 게시판

import { useContext, useEffect, useState } from "react";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import { BoardBottomOption } from "../../../contexts/BoardStyle/BoardBottomContext/BoardBottomOption";
import {
  Board,
  TotalBoardHeader,
} from "../../../contexts/BoardStyle/BoardHeaderContext";
import { TotalBoardTopOption } from "../../../contexts/BoardStyle/BoardTopOptionContext";
import { ArticleBriefType, ArticleType } from "../../../Types";
import { CurrentBoardContext } from "../../../contexts/BoardContext/CurrentBoardContext";
import { wholeArticle } from "../../../API/ArticleAPI";
import { usePagination } from "../../../contexts/BoardStyle/BoardBottomContext/PaginationContext";
import { ViewOptionContext } from "../../../contexts/BoardContext/ViewOptionContext";

const TotalBoard = () => {
  const { setCurBoardState } = useContext(CurrentBoardContext);
  const [wholeArticles, setWholeArticles] = useState<ArticleType[]>([]);
  const [wholeArticleLen, setWholeArticleLen] = useState(0);
  const { size, page, setSize, setPage, setTotPage } =
    usePagination();
  const {setViewOp} = useContext(ViewOptionContext);

  useEffect(() => {
    setCurBoardState(0);
    setSize(15);
    setPage(1);

    async function fetchWholeArticle() {
      try {
        const fetchedWholeArticles: ArticleBriefType = await wholeArticle(
          15,
          1
        );
        console.log(fetchedWholeArticles);
        setWholeArticles(fetchedWholeArticles.content);
        setWholeArticleLen(fetchedWholeArticles.totalElements);
      } catch (err) {
        console.log("Error fetching whole articles in TotalBoard");
      }
    }

    fetchWholeArticle();
    setViewOp(2);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchWholeArticle() {
      try {
        const fetchedWholeArticles: ArticleBriefType = await wholeArticle(size, page);
        console.log(fetchedWholeArticles);
        setWholeArticles(fetchedWholeArticles.content);
        setTotPage(fetchedWholeArticles.totalPages);
        setWholeArticleLen(fetchedWholeArticles.totalElements);
      } catch (err) {
        console.log("Error fetching whole articles in TotalBoard");
      }
    }

    fetchWholeArticle();
  }, [size, page, setTotPage]);

  return (
    <>
      <Board>
        <TotalBoardHeader></TotalBoardHeader>
        <TotalBoardTopOption
          articleLength={wholeArticleLen}
        ></TotalBoardTopOption>
        <ArticleTable
          board={boardAttribute.TotalBoard}
          articleList={wholeArticles} //articleList
        ></ArticleTable>
        <BoardBottomOption boardId={0}></BoardBottomOption>
      </Board>
    </>
  );
};

export default TotalBoard;
