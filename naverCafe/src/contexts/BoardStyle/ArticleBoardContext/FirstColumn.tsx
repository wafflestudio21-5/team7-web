//Home: 네모, Total: 게시판 이름, Popular: 순위(숫자), Common: 순서(숫자)

export const FirstCol = (props: {
  firstCol: string;
  board: string;
  ranking: number;
  articleId: number;
}) => {
  switch (props.firstCol) {
    case "dot":
      return <img src="https://cafe.pstatic.net/cafe4/ico-blank.gif"></img>;
    case "boardName":
      return props.board;
    case "ranking":
      return props.ranking;
    case "number":
      return props.articleId;
  }
};
