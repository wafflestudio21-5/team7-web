import axios from "axios";
import { baseURL } from "../Constants";

// article

// article 등록(post)
export function postArticle(
  title: string,
  content: string,
  boardId: number,
  allowComments: boolean,
  isNotification: boolean
) {
  return axios
    .post(baseURL + "/api/v1/articles/post", {
      title: title,
      content: content,
      boardId: boardId,
      allowComments: allowComments,
      isNotification: isNotification,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

// article 조회(get)
export function getArticle(articleId: number, username: string) {
  return axios
    .get(baseURL + `api/v1/articles/${articleId}/?${username}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

// article 좋아요 추가
export function clickLike(articleId: number) {
  return axios
    .post(baseURL + `api/v1/articles/${articleId}/like`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
export function cancelLike(articleId: number) {
  return axios
    .delete(baseURL + `api/v1/articles/${articleId}/like`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

// article 삭제
export function deleteArticle(articleId: number) {
  return axios
    .delete(baseURL + `api/v1/articles/${articleId}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}

// 전체 article 조회
export function wholeArticle() {
  return axios.get(baseURL + `api/v1/articles`).then((res) => {
    console.log(res);
    return res;
  }).catch((err) => {
    console.log(err);
    return;
  });
}

// comment
// comment 작성
export function postComment(
  articleId: number,
  userId: string,
  content: string
) {
  return axios
    .post(baseURL + `api/v1/articles/${articleId}/comments`, {
      userId: userId,
      content: content,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
// comment 조회
export function getComments(articleId: number) {
  return axios
    .get(baseURL + `api/v1/articles/${articleId}/comments`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
// comment 수정
export function editComment(
  articleId: number,
  commentId: number,
  userId: string,
  content: string
) {
  return axios
    .put(baseURL + `api/v1/articles/${articleId}/comments/${commentId}`, {
      userId: userId,
      content: content,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
// comment 삭제
export function deleteComment(
  articleId: number,
  commentId: number,
  userId: string
) {
  return axios
    .delete(baseURL + `api/v1/articles/${articleId}/comments/${commentId}`, {
      data: {
        userId: userId,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
// reComment 작성
export function postReComment(
  articleId: number,
  commentId: number,
  userId: string,
  content: string
) {
  return axios
    .post(
      baseURL + `api/v1/articles/${articleId}/comments/${commentId}/recomments`,
      {
        userId: userId,
        content: content,
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
// reComment를 조회(get 요청)하는 기능이 왜 필요한지 모르겠습니다.
// reComment 수정
export function editReComment(
  articleId: number,
  commentId: number,
  recommentId: number,
  userId: string,
  content: string
) {
  return axios
    .put(
      baseURL +
        `api/v1/articles/${articleId}/comments/${commentId}/recomments/${recommentId}`,
      {
        userId: userId,
        content: content,
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
// reComment 삭제
export function deleteReComment(
  articleId: number,
  commentId: number,
  recommentId: number,
  userId: string
) {
  return axios
    .delete(
      baseURL +
        `api/v1/articles/${articleId}/comments/${commentId}/recomments/${recommentId}`,
      {
        data: {
          userId: userId,
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
