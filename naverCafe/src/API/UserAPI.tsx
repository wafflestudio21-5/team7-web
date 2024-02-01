import axios from "axios";
import { baseURL } from "../Constants";
import { useCallback, useEffect, useState } from "react";
import { ArticleBriefType } from "../Types";

// 회원가입 함수
export function signup({
  username,
  password,
  name,
  email,
  birthDate,
  phoneNumber,
}: {
  username: string;
  password: string;
  name: string;
  email: string | null;
  birthDate: string;
  phoneNumber: string;
}) {
  return axios.post(
    baseURL + "/api/v1/signup",
    {
      username: username,
      password: password,
      name: name,
      email: email,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
    },
    {}
  );
}

// 로그인
export function login(userInfo: { username: string; password: string }) {
  return axios.post(baseURL + "/api/v1/signin", userInfo);
}
// 소셜 로그인
export function socialLogin(code: string) {
  return axios.get(baseURL + `/api/v1/auth/socialSignin/naver?code=${code}`);
}

// 사이드바 (자신의) 회원정보
// 회원정보가 바뀌었을 때 refetch가 필요하므로 custom hook으로 만들겠습니다.
export function useBriefMyInfo() {
  const [briefMyInfo, setBriefMyInfo] = useState<{
    nickname: string;
    rank: string;
    visit_count: number;
    my_article_count: number;
    my_comment_count: number;
    register_date: string;
    image?: string;
  } | null>(null);
  const refetchBriefMyInfo = useCallback(async () => {
    const res = await axios.get(baseURL + "/api/v1/users/user-brief", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.data.userinfo;
    setBriefMyInfo(data);
  }, []);
  useEffect(() => {
    refetchBriefMyInfo();
    console.log(briefMyInfo);
  }, [refetchBriefMyInfo]);
  return { briefMyInfo, refetchBriefMyInfo };
}

// 유저 profile 조회
export function useMyProfile() {
  const [myProfile, setMyProfile] = useState<{
    nickname: string;
    content: string | null;
    image: string | null;
  } | null>(null);
  const refetchMyProfile = useCallback(async () => {
    console.log("refetched!!!");
    const res = await axios.get(baseURL + "/api/v1/users/user-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.data;
    setMyProfile(data);
  }, []);
  useEffect(() => {
    refetchMyProfile();
    console.log(myProfile);
  }, [refetchMyProfile]);
  return { myProfile, refetchMyProfile };
}

// 회원정보 조회(nickname에 따른)
export function getUserInfo({ userNickname }: { userNickname: string }) {
  return axios.get(
    baseURL + `/api/v1/users/user/${userNickname}`
    // , {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //   },
    // }
  );
}

// 유저가 쓴 게시물 조회(+ 페이지네이션) => refetch 필요
export function useUserArticles({
  userNickname,
  page,
}: {
  userNickname: string;
  page?: number;
}) {
  const [userArticles, setUserArticles] = useState<{
    articleBrief: ArticleBriefType;
  } | null>(null);
  const url = `/api/v1/users/articles/${userNickname}`;
  const refetchUserArticles = useCallback(async () => {
    console.log("userArticle refetched!");
    const res = await axios.get(baseURL + url, {
      params: {
        page: page ? page : 1,
      },
    });
    const data = await res.data;
    console.log(data);
    setUserArticles(data);
  }, [url, page]);
  useEffect(() => {
    refetchUserArticles();
    console.log(userArticles);
  }, [refetchUserArticles]);
  return { userArticles, refetchUserArticles };
}

// 유저가 쓴 댓글 조회 => refetch 필요 X
export function getUserComments({ page }: { page?: number }) {
  return axios.get(baseURL + `/api/v1/users/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    params: {
      page: page ? page : 1,
    },
  });
}
// 유저가 댓글 단 글 조회 => refetch 필요 x
export function getUserCommentedArticle({
  userNickname,
  page,
}: {
  userNickname: string;
  page?: number;
}) {
  return axios.get(
    baseURL + `/api/v1/users/${userNickname}/commented-articles`,
    {
      params: {
        page: page ? page : 1,
      },
    }
  );
}

// 좋아요 한 글 => refetch 필요!
export function useUserLikedArticles({ page }: { page?: number }) {
  const [userLikedArticles, setUserLikedArticles] = useState<{
    articleBrief: ArticleBriefType;
  } | null>(null);
  const url = `/api/v1/users/liked-articles`;
  const refetchUserLikedArticles = useCallback(async () => {
    const res = await axios.get(baseURL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        page: page ? page : 1,
      },
    });
    const data = res.data;
    setUserLikedArticles(data);
  }, [url, page]);
  useEffect(() => {
    refetchUserLikedArticles();
    console.log(userLikedArticles);
  }, [refetchUserLikedArticles]);
  return { userLikedArticles, refetchUserLikedArticles };
}

// 유저 프로필 수정
export function editMyProfile({
  nickname,
  content,
  image,
}: {
  nickname: string;
  content: string;
  image: string;
}) {
  return axios.put(
    baseURL + "/api/v1/users/user-profile",
    {
      nickname: nickname,
      content: content,
      image: image,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}
