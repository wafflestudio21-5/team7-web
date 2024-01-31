//axios는 GET 메소드에서 body를 보내는 것을 허용하지 않는다.
import { baseURL } from "../Constants";

//일반 게시판 별 게시물 검색 (일반 게시판 검색, 검색 게시판 중 일반 게시판 선택)

//전체 게시판 내 게시물 검색 (상단 검색, 전체 게시판 검색, 검색 게시판 중 전체 게시판 선택) (boardId === 0)
export async function searchArticles({
  size,
  page,
  boardId,
  item,
  contentOp,
  startDate,
  endDate,
  wordInclude, //다음 단어 모두 포함
  wordExclude, //다음 단어 제외
}: {
  size: number;
  page: number;
  boardId: number;
  item: string;
  contentOp: number;
  startDate: Date;
  endDate: Date;
  wordInclude: string;
  wordExclude: string;
}) {
  try {
    const url =
      boardId === 0
        ? `/api/v1/search/${item}?size=${size}&page=${page}`
        : `/api/v1/boards/${boardId}/search/${item}?size=${size}&page=${page}`;

    const res = await fetch(baseURL + url, {
      method: "GET",
      body: JSON.stringify({
        searchCategory: contentOp,
        startDate: startDate,
        endDate: endDate,
        wordInclude: wordInclude,
        wordExclude: wordExclude,
      }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Fetch error in searchWholeBoard:", err);
  }
}