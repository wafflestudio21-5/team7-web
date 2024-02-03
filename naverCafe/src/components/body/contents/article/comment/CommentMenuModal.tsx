import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { deleteComment, deleteReComment } from "../../../../../API/CommentAPI";

const Wrapper = styled.div`
  display: inline-block;
  width: 101px;
  margin: 7px 0 0;
  padding: 8px 0;
  position: absolute;
  left: -85px;
  top: 12px;
  border-radius: 6px;
  z-index: 2;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.06);
  button {
    width: 100px;
    height: 32px;
    text-align: left;
    padding-left: 15px;
    &:hover {
      background-color: #f5f6f8;
      /* 왜 background-color가 적용되지 않는지 모르겠습니다. */
      text-decoration: underline;
    }
  }
`;
interface PropsCommentMenuModal {
  setIsEditMode: (value: boolean) => void;
  setIsMenuModalOpen: (value: boolean) => void;
  setIsCommentWriterOpen: (value: boolean) => void;
  articleId: string;
  type: "comment" | "reComment";
  commentId?: number;
  reCommentId?: number;
  refetchComments: () => Promise<void>;
  isMyComment: boolean;
  isCommentAllowed: boolean;
}
const CommentMenuModal = ({
  setIsEditMode,
  setIsMenuModalOpen,
  setIsCommentWriterOpen,
  articleId,
  type,
  commentId,
  reCommentId,
  refetchComments,
  isMyComment,
  isCommentAllowed,
}: PropsCommentMenuModal) => {
  const [isBackgroundClicked, setIsBackgroundClicked] =
    useState<boolean>(false);

  // 외부 클릭시 모달 닫기
  const ModalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ModalRef.current) {
      if (e.target instanceof Node) {
        if (!ModalRef.current.contains(e.target)) {
          console.log("back clicked");
          setIsBackgroundClicked(true);
        } else {
          console.log("back not clicked");
          setIsBackgroundClicked(false);
        }
      }
    }
  };
  useEffect(() => {
    if (!isBackgroundClicked) {
      console.log("added");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      console.log("removed");
      document.removeEventListener("mousedown", handleClickOutside);
      setIsMenuModalOpen(false);
    }
    return () => {
      console.log("clean up removed");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBackgroundClicked, setIsMenuModalOpen]);

  // comment/reComment 삭제
  const handleDelete = async () => {
    if (type === "comment" && commentId) {
      setIsMenuModalOpen(false);

      await deleteComment({
        articleId: Number(articleId),
        commentId: commentId,
      });
      await refetchComments();
    } else if (type === "reComment" && commentId && reCommentId) {
      alert("댓글을 삭제하시겠습니까");
      setIsMenuModalOpen(false);
      await deleteReComment({
        articleId: Number(articleId),
        commentId: commentId,
        reCommentId: reCommentId,
      });
      await refetchComments();
    }
  };
  if (isMyComment) {
    return (
      <Wrapper ref={ModalRef}>
        <button
          className="editComment"
          onClick={() => {
            setIsEditMode(true);
            setIsMenuModalOpen(false);
          }}
        >
          수정
        </button>
        <button className="deleteComment" onClick={() => handleDelete()}>
          삭제
        </button>
      </Wrapper>
    );
  } else {
    if (isCommentAllowed) {
      return (
        <Wrapper ref={ModalRef}>
          <button
            onClick={() => {
              setIsMenuModalOpen(false);
              setIsCommentWriterOpen(true);
            }}
          >
            댓글 쓰기
          </button>
        </Wrapper>
      );
    } else {
      return <></>;
    }
  }
};
export default CommentMenuModal;
