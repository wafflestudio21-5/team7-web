import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Constants";
import { Cafe } from "../Types";

export function useCafeInfo() {
  const [memberCount, setMemberCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);

  axios.get(baseURL + "").then((res) => {
    setMemberCount(res.data);
  });
  axios.get(baseURL + "").then((res) => {
    setArticleCount(res.data);
  });

  return { memberCount, articleCount };
}

//Constants.tsx에 들어가도 좋을 것 같지만, 일단 여기 두었습니다.
export const waffleCafe: Cafe = {
  name: "와플카페",
  url: "https://cafe.naver.com/wafflecafe",
  manager: "매니저",
  createdAt: "2024.01.13 개설",
  location: "서울특별시 관악구",
  description: "와플스튜디오 team7의 토이프로젝트 카페입니다.",
};
