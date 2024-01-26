import { styled } from "styled-components";

export const Board = styled.div`
  width: 860px;
  margin: 0 auto;
  background-color: #ffffff;
  font-size: 13px;
`;

export const StyledHomeBoard = styled(Board)`
  display: flex;
  flex-direction: column;
`;

//TotalBoard: -
const StyledBoardHeader = styled.div<{ $isFavorite?: boolean }>`
  display: table;
  width: 100%;
  table-layout: fixed;
  .title-area {
    display: table-cell;
    width: 550px;
    word-break: break-all;
    word-wrap: break-word;
    word-break: break-word;
    text-align: left;

    .info_tit {
      margin-top: -1px;
      line-height: 25px;

      .sub-tit-color {
        display: inline;
        font-weight: 600;
        font-size: 22px;
        line-height: 24px;
        vertical-align: sub;
      }
    }
  }
`;

//PopularBoard: 게시판 설명
const StyledPopularBoardHeader = styled(StyledBoardHeader)`
  .board_explanation {
    margin-top: 8px;
    font-size: 13px;
    line-height: 15px;
    color: #999;
  }
`;

//CommonBoard: 즐겨찾기 버튼 추가
const StyledCommonBoardHeader = styled(StyledBoardHeader)`
  button {
    all: unset;
  }
  .bookmark {
    margin: 2px 2px 0 6px;
    vertical-align: -1px;
    display: inline-block;
    background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
    background-repeat: no-repeat;
    vertical-align: top;

    width: 20px;
    height: 20px;

    background-position: ${(props) =>
      props.$isFavorite ? "-4px -198px" : "-32px -198px"};
  }
`;

export const TotalBoardHeader = () => {
  return (
    <StyledBoardHeader>
      <div className="title-area">
        <div className="info_tit">
          <h3 className="sub-tit-color">전체글보기</h3>
        </div>
      </div>
    </StyledBoardHeader>
  );
};

export const PopularBoardHeader = () => {
  return (
    <StyledPopularBoardHeader>
      <div className="title-area">
        <div className="info_tit">
          <h3 className="sub-tit-color">카페 인기글</h3>
        </div>
        <p className="board_explanation">
          우리 카페 인기글을 모아서 볼 수 있습니다.
        </p>
      </div>
    </StyledPopularBoardHeader>
  );
};

export const CommonBoardHeader = ({ isFavorite, boardName }: { isFavorite: boolean, boardName:string }) => {
  return (
    <StyledCommonBoardHeader $isFavorite={isFavorite}>
      <div className="title-area">
        <div className="info_tit">
          <h3 className="sub-tit-color">{boardName}</h3>
          <button className="bookmark"></button>
        </div>
      </div>
    </StyledCommonBoardHeader>
  );
};
