//Home: 네모, Total: 게시판 이름, Popular: 순위(숫자), Common: 순서(숫자)

import { useNavigate } from "react-router-dom";
import { BoardType } from "../../../Types";
import styled from "styled-components";

const StyledBoardName = styled.div`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
      return <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif"></img>;
    case "boardName":
      return (
        <StyledBoardName onClick={() => navigate(`/board/${props.board.id}`)}>
          {props.board.name}
        </StyledBoardName>
      );
    case "ranking":
      return props.ranking;
    case "number":
      return props.articleId;
  }
};
