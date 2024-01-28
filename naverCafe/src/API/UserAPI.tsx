import axios from "axios";
import { baseURL } from "../Constants";
import { useCallback, useEffect, useState } from "react";

// 회원가입 함수
export function signup(userInfo: {
  username: string;
  password: string;
  name: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
}) {
  return axios.post(baseURL + "/api/v1/signup", userInfo);
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
    content: string;
    image: string;
  } | null>(null);
  const refetchMyProfile = useCallback(async () => {
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
