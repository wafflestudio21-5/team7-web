import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { baseURL } from "../Constants";
import { CommentType } from "../Types";
// comment

// comment 작성(post)
export function postComment({
  articleId,
  content,
  isSecret,
}: {
  articleId: number;
  content: string;
  isSecret: boolean;
}) {
  return axios.post(
    baseURL + `/api/v1/articles/${articleId}/comments`,
    // axios post는 url-body-추가(header 등) 순서로 보낸다... body가 없다면 빈 객체를 넣어야한다...
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        content: content,
        isSecret: isSecret,
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
  return axios.put(
    baseURL + `/api/v1/articles/${articleId}/comments/${commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        content: content,
      },
    }
  );
}
// comment 삭제(delete)
export function deleteComment({
  articleId,
  commentId,
}: {
  articleId: number;
  commentId: number;
}) {
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
export function postReComment({
  articleId,
  commentId,
  content,
  isSecret,
}: {
  articleId: number;
  commentId: number;
  content: string;
  isSecret: boolean;
}) {
  return axios.post(
    baseURL + `/api/v1/articles/${articleId}/comments/${commentId}/recomments`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        content: content,
        isSecret: isSecret,
      },
    }
  );
}
// reComment를 조회 -> (get 요청)하는 기능이 왜 필요한지 모르겠습니다.
// reComment 수정
export function editReComment({
  articleId,
  commentId,
  reCommentId,
  content,
}: {
  articleId: number;
  commentId: number;
  reCommentId: number;
  content: string;
}) {
  return axios.put(
    baseURL +
      `/api/v1/articles/${articleId}/comments/${commentId}/recomments/${reCommentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        content: content,
      },
    }
  );
}
// reComment 삭제
export function deleteReComment({
  articleId,
  commentId,
  reCommentId,
}: {
  articleId: number;
  commentId: number;
  reCommentId: number;
}) {
  return axios.delete(
    baseURL +
      `/api/v1/articles/${articleId}/comments/${commentId}/recomments/${reCommentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
