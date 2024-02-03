import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { likeBoard, unlikeBoard, useGetLikeBoard } from "../../API/BoardAPI";
import { BoardType } from "../../Types";
import { useMyProfile } from "../../API/UserAPI";
import { useNavigate } from "react-router-dom";

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
  input {
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

export const CommonBoardHeader = ({ board }: { board: BoardType }) => {
  const { myProfile } = useMyProfile();
  const navigate = useNavigate();
  const { favList, refetch } = useGetLikeBoard();
  const [isFav, setIsFav] = useState(
    favList && favList.boards.some((b) => b.id === board.id)
  );

  const handleFavBoard = async () => {
    if (myProfile) {
      const newFavStatus = !isFav;

      console.log(`isFav val: ${isFav}`);
      console.log(`newFavStat val: ${newFavStatus}`);

      if (isFav) {
        await unlikeBoard(board.id);
      } else {
        await likeBoard(board.id);
      }
      await refetch();
      setIsFav(newFavStatus); //로컬에서 바로 토글 상태를 반영하기 위함
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (myProfile) {
      refetch();
      setIsFav(favList && favList.boards.some((b) => b.id === board.id));
      //console.log(`board: `, board, `favList: `, favList, `isFav: ${isFav}`); //isFav는 비동기적 처리로 인해 이전의 값을 출력한다.
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

useEffect(() => {
  if (myProfile) {
    // refetch 함수 호출 후 프로미스가 resolve되면 상태를 업데이트합니다.
    refetch()
      .then(() => {
        // setState 함수는 비동기적으로 실행되므로 이전 상태를 바로 로그에 찍으면 업데이트 이전의 상태를 볼 수 있습니다.
        setIsFav(favList && favList.boards.some((b) => b.id === board.id));
      })
      .catch((error) =>
        console.error("Error fetching favorite boards:", error)
      );

    // 로그를 바로 찍으면 refetch 이후 상태가 반영되기 전의 값을 볼 수 있습니다.
    // 따라서, 이 로그는 항상 비동기 작업이 완료된 후의 상태를 정확히 반영하지 않습니다.
    console.log(`board: `, board, `favList: `, favList, `isFav: ${isFav}`);
  }
}, [myProfile, refetch, board]);
  

  return (
    <StyledCommonBoardHeader $isFavorite={isFav ? isFav : false}>
      <div className="title-area">
        <div className="info_tit">
          <h3 className="sub-tit-color">{board.name}</h3>
          <input
            type="checkbox"
            checked={isFav ? isFav : false}
            onClick={handleFavBoard}
            className="bookmark"
          ></input>
        </div>
      </div>
    </StyledCommonBoardHeader>
  );
};
