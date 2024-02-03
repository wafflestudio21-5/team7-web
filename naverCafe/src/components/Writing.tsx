import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import WritingContent from "./writing/WritingContent";
import WritingHeader from "./writing/WritingHeader";
import WritingSideBar from "./writing/WritingSideBar";

import { useEffect, useState } from "react";

import { editArticle, postArticle } from "../API/ArticleAPI";

import QueryString from "qs";
import { useWholeBoard } from "../API/BoardAPI";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 860px 200px;
  column-gap: 20px;
  row-gap: 22px;
  & > div:nth-child(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
  & > div:nth-child(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  & > div:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const Writing = () => {
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [isCommentAllowed, setIsCommentAllowed] = useState<boolean>(true);
  const [openSetting, setOpenSetting] = useState<string>("전체공개");
  const [inputBoard, setInputBoard] =
    useState<string>("게시판을 선택해주세요.");
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputContent, setInputContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { boardList } = useWholeBoard();

  const isEditMode = Boolean(QueryString.parse(location.search)["?editMode"]);
  // 만약 글을 수정하는 상태이면(params로 editMode=true) 데이터 미리 채워두기
  useEffect(() => {
    if (isEditMode) {
      const { title, content, board, allowComments, isNotification } =
        location.state;
      setInputTitle(title);
      setInputContent(content);
      setInputBoard(board.name);
      setIsCommentAllowed(allowComments);
      setIsNotification(isNotification);
    }
  }, [location, isEditMode]);

  const handleWritePost = async () => {
    if (inputBoard === "게시판을 선택해주세요.") {
      alert("게시판을 선택해주세요.");
    } else if (inputTitle === "") {
      alert("제목을 입력해주세요.");
    } else if (inputContent === "") {
      alert("내용을 입력해주세요.");
    } else {
      if (boardList !== null) {
        const boardId = boardList.boards.filter(
          (board) => board.name === inputBoard
        )[0].id;
        await postArticle({
          title: inputTitle,
          content: inputContent,
          boardId: boardId,
          allowComments: isCommentAllowed,
          isNotification: isNotification,
        })
          .then((res) => {
            if (res !== undefined) {
              navigate(`/articles/${res.data.id}`);
            }
          })
          .catch((err) => console.error(err));
      }
    }
  };
  const handleEditArticle = async () => {
    if (inputBoard === "게시판을 선택해주세요.") {
      alert("게시판을 선택해주세요.");
    } else if (inputTitle === "") {
      alert("제목을 입력해주세요.");
    } else if (inputContent === "") {
      alert("내용을 입력해주세요.");
    } else {
      if (boardList) {
        const boardId = boardList.boards.filter(
          (board) => board.name === inputBoard
        )[0].id;
        const articleId = Number(location.state["articleId"]);
        await editArticle(articleId, {
          title: inputTitle,
          content: inputContent,
          boardId: boardId,
          allowComments: isCommentAllowed,
          isNotification: isNotification,
        })
          .then((res) => {
            if (res !== undefined) {
              navigate(`/articles/${res.data.id}`);
            }
          })
          .catch((err) => console.error(err));
      }
    }
  };
  return (
    <Wrapper>
      <WritingHeader
        handleWritePost={handleWritePost}
        handleEditArticle={handleEditArticle}
        isEditMode={isEditMode}
      />
      <WritingContent
        inputBoard={inputBoard}
        setInputBoard={setInputBoard}
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
        inputContent={inputContent}
        setInputContent={setInputContent}
        boardList={boardList}
      />
      <WritingSideBar
        isNotification={isNotification}
        setIsNotification={setIsNotification}
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
        isCommentAllowed={isCommentAllowed}
        setIsCommentAllowed={setIsCommentAllowed}
      />
    </Wrapper>
  );
};

export default Writing;
