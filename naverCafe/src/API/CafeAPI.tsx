import { useState } from "react";
import axios from "axios";
import { baseURL } from "../Constants";

export function useCafeInfo() {
  const [memberCount, setMemberCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);

  axios.get(baseURL + "/api/v1/cafe-info").then((res) => {
    setMemberCount(res.data.member_count);
  });
  axios.get(baseURL + "/api/v1/cafe-info").then((res) => {
    setArticleCount(res.data);
  });

  return { memberCount, articleCount };
}


