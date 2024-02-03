import styled from "styled-components";
import WritingEditor from "./WritingEditor";
import { useMemo, useState } from "react";
import { BoardList } from "../../Constants";

const Wrapper = styled.div``;
const EditorHeader = styled.div`
  text-align: left;
  padding: 20px 28px;
  border-radius: 12px;
  border: 1px solid #eee;
  margin-bottom: 12px;
  & > .buttons {
    position: relative;
    margin-bottom: 16px;
    & > .selectBoard {
      display: inline-block;
      position: relative;
      button {
        text-align: left;
        width: 397px;
        height: 48px;
        padding: 0 25px 0 11px;
        font-size: 16px;
        border: none;
        outline: none;
        background: #fff;
        border-bottom: 1px solid #ebecef;
        &::after {
          content: "";
          display: inline-block;
          width: 7px;
          height: 4px;
          right: 10px;
          top: 20px;
          background: url(https://ca-fe.pstatic.net/web-section/static/img/ico-menu-hide.svg?3e68c7e…=)
            no-repeat;
          vertical-align: 3px;
          position: absolute;
        }
      }
      & > button.checked {
        &::after {
          background: url(https://ca-fe.pstatic.net/web-section/static/img/ico-menu-show.svg?c73c0b3…=)
            no-repeat;
        }
      }
      & > .boardList {
        display: inline-block;
        width: 397px;
        left: 0;
        top: 48px;
        padding: 8px 0;
        margin-top: 2px;
        background-color: #fff;
        font-size: 13px;
        box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.06);
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;

        z-index: 2;
        & > .board {
          padding: 0 15px;
          height: 32px;
          cursor: pointer;
          &:hover {
            background: #f5f6f8;
            text-decoration: underline;
          }
        }
        & > .active {
          color: #03c75a;
        }
      }
    }
    & > .selectHead {
      display: inline-block;
      position: relative;
      button {
        text-align: left;
        width: 397px;
        height: 48px;
        padding: 0 25px 0 11px;
        font-size: 16px;
        border: none;
        outline: none;
        background: #fff;
        border-bottom: 1px solid #ebecef;
        &::after {
          content: "";
          display: inline-block;
          width: 7px;
          height: 4px;
          right: 10px;
          top: 20px;
          background: url(https://ca-fe.pstatic.net/web-section/static/img/ico-menu-hide.svg?3e68c7e…=)
            no-repeat;
          vertical-align: 3px;
          position: absolute;
        }
      }
    }
  }
  & > .title {
    input {
      display: inline-block;
      width: 804px;
      height: 48px;
      padding: 13px 16px 11px;
      font-size: 16px;
      background-color: #f5f6f8;
      border: none;
      outline: none;
      border-radius: 10px;
      box-sizing: border-box;
    }
  }
`;
const EditorBox = styled.div``;

interface PropsWritingContent {
  inputBoard: string;
  setInputBoard: (value: string) => void;
  inputTitle: string;
  setInputTitle: (value: string) => void;
  inputContent: string;
  setInputContent: (value: string) => void;
  boardList: {
    boards: {
      id: number;
      name: string;
    }[];
  } | null;
}
const WritingContent = ({
  inputBoard,
  setInputBoard,
  inputTitle,
  setInputTitle,
  inputContent,
  setInputContent,
  boardList,
}: PropsWritingContent) => {
  const [isInputBoardClicked, setIsInputBoardClicked] =
    useState<boolean>(false);
  console.log(BoardList());

  const newBoardList = useMemo(() => {
    return boardList?.boards.map((board) => {
      return (
        <li
          key={board.id}
          className={board.name === inputBoard ? "board active" : "board"}
          onClick={() => {
            setIsInputBoardClicked(false);
            setInputBoard(board.name);
          }}
        >
          {board.name}
        </li>
      );
    });
  }, [inputBoard, setInputBoard, boardList]);

  return (
    <Wrapper>
      <EditorHeader>
        <div className="buttons">
          <div className="selectBoard">
            <button
              className={isInputBoardClicked ? "checked" : "notChecked"}
              onClick={() => setIsInputBoardClicked(!isInputBoardClicked)}
            >
              {inputBoard}
            </button>
            {isInputBoardClicked ? (
              <ul className="boardList">{newBoardList}</ul>
            ) : null}
          </div>
          <div className="selectHead">
            <button>말머리선택</button>
            {/* 말머리 선택 기능은 일단 보류해두겠습니다. */}
          </div>
        </div>
        <div className="title">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={(e) => setInputTitle(e.target.value)}
            value={inputTitle}
          />
        </div>
      </EditorHeader>
      <EditorBox>
        <WritingEditor
          inputContent={inputContent}
          setInputContent={setInputContent}
        />
      </EditorBox>
    </Wrapper>
  );
};

export default WritingContent;
