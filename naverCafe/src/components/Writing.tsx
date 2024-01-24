import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import WritingContent from "./writing/WritingContent";
import WritingHeader from "./writing/WritingHeader";
import WritingSideBar from "./writing/WritingSideBar";

import { useState } from "react";

import { postArticle } from "../API/ArticleAPI";

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
  const [isAnnouncement, setIsAnnouncement] = useState<boolean>(false);
  const [isCommentAllowed, setIsCommentAllowed] = useState<boolean>(true);
  const [openSetting, setOpenSetting] = useState<string>("전체공개");
  const [inputBoard, setInputBoard] =
    useState<string>("게시판을 선택해주세요.");
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputContent, setInputContent] = useState("");

  const navigate = useNavigate();

  const handleWritePost = async () => {
    if (inputBoard === "게시판을 선택해주세요.") {
      alert("게시판을 선택해주세요.");
    } else if (inputTitle === "") {
      alert("제목을 입력해주세요.");
    } else if (inputContent === "") {
      alert("내용을 입력해주세요.");
    } else {
      await postArticle(
        inputTitle,
        inputContent,
        1,
        // board id는 어떻게 처리되는지 모르겠어서 일단 이렇게 두었습니다.
        isCommentAllowed,
        isAnnouncement
      ).then((res) => {
        if (res !== undefined) {
          navigate(`/articles/${res.data.id}`);
        }
      });
    }
  };

  return (
    <Wrapper>
      <WritingHeader handleWritePost={handleWritePost} />
      <WritingContent
        inputBoard={inputBoard}
        setInputBoard={setInputBoard}
        inputTitle={inputTitle}
        setInputTitle={setInputTitle}
        inputContent={inputContent}
        setInputContent={setInputContent}
      />
      <WritingSideBar
        isAnnouncement={isAnnouncement}
        setIsAnnouncement={setIsAnnouncement}
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
        isCommentAllowed={isCommentAllowed}
        setIsCommentAllowed={setIsCommentAllowed}
      />
    </Wrapper>
  );
};

export default Writing;
