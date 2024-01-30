import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { baseURL } from "../Constants";
import { ArticleType, BoardType, GroupType } from "../Types";

export function useWholeBoard() {
  const [boardList, setBoardList] = useState<{ boards: BoardType[] } | null>(
    null
  );
  const url = "/api/v1/boards";
  const refetch = useCallback(async () => {
    const res = await axios.get(baseURL + url);
    const data = await res.data;
    setBoardList(data);
  }, [url]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { boardList, refetch };
}

export function useBoardGroup() {
  const [groupList, setGroupList] = useState<{
    boardGroups: GroupType[];
  } | null>(null);
  const url = "/api/v1/boards-in-group";
  const refetch = useCallback(async () => {
    const res = await axios.get(baseURL + url);
    const data = await res.data;
    setGroupList(data);
  }, [url]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { groupList, refetch };
}

//게시판 즐겨찾기
//이상하게 axios를 사용하면, unlikeBoard와 달리 likeBoard에서 500에러가 발생함. 따라서 fetch를 사용
//해결되지 않은 에러: Error in likeBoard: SyntaxError: Unexpected end of JSON input
//전체 일반게시판 컴포넌트가 새로 렌더링될 때 favList와 isFav가 null인 에러.
export function likeBoard(boardId:number) {
  const url = `${baseURL}/api/v1/boards/${boardId}/likes`;
  const accessToken = localStorage.getItem("accessToken");

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error in likeBoard:", error);
    });
}


//게시판 즐겨찾기 취소
export function unlikeBoard(boardId: number) {
  const url = `/api/v1/boards/${boardId}/likes`;
  return axios
    .delete(baseURL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .catch((error) => {
      console.log(error);
    });
}

//게시판 즐겨찾기 모두 조회
//초기 fav 리스트
export function useGetLikeBoard() {
  const [favList, setFavList] = useState<{ boards: BoardType[] } | null>(null);
  const url = `/api/v1/boards/likes`;
  const refetch = useCallback(async () => {
    const res = await axios.get(baseURL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.data;
    setFavList(data);
  }, [url]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { favList, refetch };
}

//게시판별 게시물 리스트 및 인기게시판 게시물 리스트
export function useArticleList({
  boardId,
  size,
  page,
  sort,
}: {
  boardId: number;
  size?: number;
  page?: number;
  sort?: string;
}) {
  const [articleList, setArticleList] = useState<{
    articleBrief: {
      content: ArticleType[];
      empty: boolean;
      first: true;
      last: false;
      number: number;
      numberOfElements: number;
      pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        unpaged: boolean;
      };
      size: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      totalElements: number;
      totalPages: number;
    };
  } | null>(null);

  const url = `/api/v1/boards/${boardId}/articles`;
  const refetch = useCallback(async () => {
    const res = await axios.get(baseURL + url, {
      params: {
        size: size ? size : "",
        page: page ? page : "",
        sort: sort ? sort : "",
      },
    });
    const data = await res.data;
    setArticleList(data);
  }, [url, size, page, sort]);

  useEffect(() => {
    refetch();
  }, [refetch]);
  return { articleList, refetch };
}

//공지글 가져오기 (전체)
