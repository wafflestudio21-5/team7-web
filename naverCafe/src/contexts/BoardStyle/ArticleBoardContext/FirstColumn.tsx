//Home: 네모, Total: 게시판 이름, Popular: 순위(숫자), Common: 순서(숫자)

import { useNavigate } from "react-router-dom";
import { BoardType } from "../../../Types";
import styled from "styled-components";

const StyledBoardName = styled.div`
  padding-left: 6px;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledDot = styled.img`
  margin-bottom: 2px;
  margin-left: 8px;
`;

export const FirstCol = (props: {
  firstCol: string;
  board: BoardType;
  ranking: number;
  articleId: number;
}) => {
  const navigate = useNavigate();

  switch (props.firstCol) {
    case "dot":
      return (
        <StyledDot src="https://cafe.pstatic.net/cafe4/ico-blank.gif"></StyledDot>
      );
    case "boardName":
      return (
        <StyledBoardName onClick={() => navigate(`/board/${props.board.id}`)}>
          {props.board.name}
        </StyledBoardName>
      );
    case "ranking":
      return props.ranking + 1;
    case "number":
      return props.articleId; //원본 카페에서는 article이 생성된 순서대로 index가 부여되기 때문에 일단 이렇게 뒀습니다.
  }
};
