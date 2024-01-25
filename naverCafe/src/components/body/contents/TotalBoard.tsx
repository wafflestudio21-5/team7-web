// 전체글 게시판

import { useEffect, useState } from "react";
import { useArticleList } from "../../../API/BoardAPI";
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

const TotalBoard = () => {
  const { setTotalLength, indexOfFirstItem, indexOfLastItem, itemsPerPage,  updatePagination, currentPage} =
    usePagination(0);
  //const { articleList } = useArticleList(); // 전체 게시물을 조회할 수 있는 api가 있으면 좋겠는데 없네요..!
  const [currentItems, setCurrentItems] = useState<{ articles: Article[] }>({
    articles: [],
  });

  useEffect(() => {
    // setTotalLength(articleList ? articleList.length : 0);
    setTotalLength(aList.length);
  }, []);

  useEffect(() => {
    const newItems = aList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems({ articles: newItems });
    updatePagination({ boardId: 0, currentPage: currentPage }); 
    console.log(currentPage);
  }, [itemsPerPage]);

  useEffect(() => {
    
  })

  return (
    <>
      <Board>
        <TotalBoardHeader></TotalBoardHeader>
        <TotalBoardTopOption></TotalBoardTopOption>
        {/* articleList.legnth 전달 */}
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
