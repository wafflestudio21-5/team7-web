import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { baseURL } from "../Constants";
import { ArticleType, Board } from "../Types";

export function useWholeBoard() {
  const [boardList, setBoardList] = useState({
    boards: [
      { id: 1, name: "스프링" },
      { id: 2, name: "장고" },
    ],
  });
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

export function useWholeBoard2() {

  const url = "/api/v1/boards";
  const refetch = useCallback(async () => {
    const res = await axios.get(baseURL + url);
    const boardList = await res.data;

  }, [url]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    refetch();
  }, [refetch]);
  return { boardList, refetch };
}



export function useBoardGroup() {
  const [boardList, setBoardList] = useState<Board[] | null>(null);
  const url = "/api/v1/boards-in-group";
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

// export function useLikeBoard(userId: string, boardId: number) {
//     const url = "/api/v1/boards/" + { boardId } + "/like";
//     axios.post
// }

// export function useUnlikeBoard(userId: string, boardId: number) {
//   const url = "/apli/v1/boards/" + { boardId } + "/unlike";
// }

export function useGetLikeBoard(userId: string) {
  const [boardList, setBoardList] = useState<Board[] | null>(null);
  const url = "/api/v1/boards/likes";
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

export function useArticleList({
  boardId,
  type,
}: {
  boardId?: number;
  type?: string;
}) {
  const [articleList, setArticleList] = useState<{
    articles: ArticleType[];
  } | null>(null);

  const url =
    type === undefined
      ? `/api/v1/boards/${boardId}/articles`
      : `/api/v1/articles/hot?sortBy=${type}`;
  const refetch = useCallback(async () => {
    const res = await axios.get(baseURL + url);
    const data = await res.data;
    setArticleList(data);
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);
  return { articleList, refetch };
}