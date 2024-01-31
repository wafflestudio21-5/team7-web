// 웹 앱 전체적으로 필요한 데이터는 api에 모아두는듯
// 개별 컴포넌트에서만 필요한 요청은 개별 컴포넌트 안에 만들어두는듯
// get요청과 같이, 요청을 보내고 받아올 데이터가 있는 경우, state로서 받는 데이터를 관리하는듯
// refetch 요청과 같은 경우, 어떤 데이터가 추가/수정/삭제 되었을 때 전체 데이터를 다시 불러오기 위함인듯
// use~~로 시작하는 함수는 React Hook or React 요소 component

import axios from "axios";
import { baseURL } from "../Constants";
import { useState, useEffect, useCallback } from "react";

import { ArticleType } from "../Types";

// article

// article 등록(post)
// navigate는 postArticle 함수를 쓸 컴포넌트 안에서 handlePostAritcle 함수를 새로 만들어서 구현할 것
// .then(), .catch()는 postArticle 함수를 사용하는 컴포넌트 내에서 사용하기
export function postArticle(newArticleInfo: {
  title: string;
  content: string;
  boardId: number;
  allowComments: boolean;
  isNotification: boolean;
}) {
  return axios.post(baseURL + "/api/v1/articles/post", newArticleInfo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

// article 수정(put)
// 글쓰기 페이지에서 실행됨 -> useNavigate를 통해 이동
export function editArticle(
  articleId: number,
  newArticleInfo: {
    title: string;
    content: string;
    boardId: number;
    allowComments: boolean;
    isNotification: boolean;
  }
) {
  return axios.put(
    baseURL + `/api/v1/articles/${articleId}/modify`,
    newArticleInfo,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// article 삭제(delete)
export function deleteArticle(articleId: number) {
  return axios.delete(baseURL + `/api/v1/articles/${articleId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}
// article 조회(get)
// article의 좋아요, 댓글 등이 바뀌었을 때 refetch 할 수 있어야 하므로, state로 받는 데이터 관리하고, refetch 함수 정의하겠습니다.
// username을 쿼리로 전달해야하는가?(api 명세에서는 그렇게 되어 있음) -> 인증 기반이면 필요없을듯
export function useArticle(articleId: number) {
  const [article, setArticle] = useState<{
    article: ArticleType;
    isLiked: boolean;
  } | null>(null);
  const url = `/api/v1/articles/${articleId}`;
  const refetchArticle = useCallback(async () => {
    const res = await axios.get(baseURL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.data;
    setArticle(data);
  }, [url]);
  useEffect(() => {
    refetchArticle();
    console.log(article);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchArticle]);
  return { article, refetchArticle };
}

// article 좋아요 추가
export function addLike(articleId: number) {
  return axios.post(
    baseURL + `/api/v1/articles/${articleId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
// article 좋아요 취소
export function deleteLike(articleId: number) {
  return axios.delete(baseURL + `/api/v1/articles/${articleId}/like`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}
// article 공지로 등록 -> 이 기능이 필요한가?
// 모든 article 조회 -> 이 기능이 필요한가?
//---------------------------------------------------------------------------------------------

// 전체 article 조회 (노션에서는 default값-size:15, page:1-이 있다곤 했지만 일단 파라미터가 필수인 것으로 했습니다.)
export async function wholeArticle(size: number, page: number) {
  try {
    const url = baseURL + `/api/v1/articles?size=${size}&page=${page}`;
    const res = await axios.get(url);
    console.log(res);
    return res.data.articleBrief;
  } catch (err) {
    console.log(err);
    return [];
  }
}

//공지 조회
export async function notiArticle(): Promise<ArticleType[]> {
  try {
    const res = await axios.get(baseURL + `/api/v1/articles/notification`);
    console.log(res);
    return res.data.articleBrief;
  } catch (err) {
    console.log(err);
    return [];
  }
}


//아직 백엔드에서 정렬이 제대로 되어 오지는 않는 것 같지만, 제대로 작동하는 것은 확인하였습니다.
export async function hotArticle(
  HotSortType: string,
  HotTimeType: string,
  page?: number
) {
  try {
    const res = await axios.get(baseURL + `/api/v1/articles/hot`, {
      params: {
        sortBy: HotSortType,
        time: HotTimeType,
        page: page ? page : "",
      },
    });
    console.log(res);
    return res.data.articleBrief;
  } catch (err) {
    console.log(err);
    return {content:[]};
  }
}
