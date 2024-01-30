import { useState } from "react";
import { useCallback } from "react";
import { baseURL } from "./Constants";
import axios from "axios";
import { useEffect } from "react";
import { postArticle } from "./API/ArticleAPI";
import { postComment } from "./API/CommentAPI";
import { useArticle } from "./API/ArticleAPI";
import { useArticleList } from "./API/BoardAPI";

const Test = () => {
  // const { boardList } = useWholeBoard();
  // console.log(boardList);
  function useGetArticle() {
    const [article, setArticle] = useState();
    const url = "/api/v1/articles/1";
    const refetch = useCallback(async () => {
      const res = await axios.get(baseURL + url);
      const data = await res.data;
      setArticle(data);
    }, [url]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      refetch();
      console.log(article);
    }, [refetch]);
    return { article, refetch };
  }
  function useLogin() {
    const [accessToken, setAccessToken] = useState<string>("");
    const url = "/api/v1/signin";
    const refetch = useCallback(async () => {
      const res = await axios.post(baseURL + url, {
        username: "doo",
        password: "doo123",
      });
      const data = await res.data;
      setAccessToken(data);
    }, [url]);
    useEffect(() => {
      refetch();
      console.log(accessToken);
    }, [refetch]);
    return { accessToken, refetch };
  }
  function useUserInfo() {
    const [userInfo, setUserInfo] = useState();
    const url = "/api/v1/users/user";
    const refetch = useCallback(async () => {
      const res = await axios.get(baseURL + url);
      const data = await res.data;
      setUserInfo(data);
    }, [url]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      refetch();
      console.log(userInfo);
    }, [refetch]);
    return { userInfo, refetch };
  }
  function useGetComment() {
    const [comments, setComments] = useState();
    const url = "/api/v1/articles/1/comments";
    const refetch = useCallback(async () => {
      const res = await axios.get(baseURL + url);
      const data = await res.data;
      setComments(data);
    }, [url]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      refetch();
      console.log(comments);
    }, [refetch]);
    return { comments, refetch };
  }
  // const { article } = useArticle(1);
  // console.log(article);
  // console.log("articleLIst");
  // const { articleList } = useArticleList({ boardId: 1 });
  // console.log(articleList);

  // const { article } = useGetArticle();
  // useEffect(() => {
  //   // postArticle({
  //   //   title: "d",
  //   //   content: "d",
  //   //   boardId: 1,
  //   //   allowComments: true,
  //   //   isNotification: true,
  //   // });
  //   // postComment(1, "sdf");
  //   // useLogin()
  // }, []);
  // useLogin();
  // console.log("article 조회:" + article);
  // const { accessToken } = useLogin();
  // console.log(accessToken);
  // const { userInfo } = useUserInfo();
  // console.log(userInfo);
  // const { comments } = useGetComment();
  // console.log(comments);
  function getUserComments() {
    return axios.get(baseURL + "/api/v1/users/comments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
  console.log(getUserComments());
  return (
    <div>
      <div>This is Test for API</div>
      <div>
        <button onClick={() => {}}>get</button>
      </div>
    </div>
  );
};
export default Test;
