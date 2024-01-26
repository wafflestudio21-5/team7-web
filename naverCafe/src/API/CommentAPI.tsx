import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { baseURL } from "../Constants";
import { CommentType } from "../Types";
// comment

// comment 작성(post)
export function postComment(articleId: number, content: string) {
  // const params = { content: content };
  return axios.post(
    baseURL + `/api/v1/articles/${articleId}/comments?content=${content}`,
    // {
    //   params: params,
    // },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// comment 조회(get)
// 대댓글 추가시 refetch 필요
export function useComments(articleId: number) {
  const [comments, setComments] = useState<{
    comments: CommentType[];
  } | null>(null);
  const url = `/api/v1/articles/${articleId}/comments`;
  const refetchComments = useCallback(async () => {
    const res = await axios.get(baseURL + url);
    const data = await res.data;
    setComments(data);
  }, [url]);
  useEffect(() => {
    refetchComments();
    console.log(comments);
  }, [refetchComments]);
  return { comments, refetchComments };
}

// comment 수정(put)
export function editComment(
  articleId: number,
  commentId: number,
  content: string
) {
  const params = { content: content };
  return axios.put(
    baseURL + `/api/v1/articles/${articleId}/comments/${commentId}`,
    { params: params },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// comment 삭제(delete)
export function deleteComment(articleId: number, commentId: number) {
  return axios.delete(
    baseURL + `/api/v1/articles/${articleId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// reComment 작성(post)
export function postReComment(
  articleId: number,
  commentId: number,
  content: string
) {
  const params = { content: content };
  return axios.post(
    baseURL + `/api/v1/articles/${articleId}/comments/${commentId}/recomments`,
    { params: params },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// reComment를 조회 -> (get 요청)하는 기능이 왜 필요한지 모르겠습니다.
// reComment 수정
export function editReComment(
  articleId: number,
  commentId: number,
  recommentId: number,
  content: string
) {
  const params = { content: content };
  return axios.put(
    baseURL +
      `/api/v1/articles/${articleId}/comments/${commentId}/recomments/${recommentId}`,
    { params: params },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// reComment 삭제
export function deleteReComment(
  articleId: number,
  commentId: number,
  recommentId: number
) {
  return axios.delete(
    baseURL +
      `/api/v1/articles/${articleId}/comments/${commentId}/recomments/${recommentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
