import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Order,
  orderList,
} from "../../../components/body/contents/PopularBoard";
import { Pagination } from "./Pagination";

//TotalBoard: 페이지 넘버(페이지네이션) / 검색창 (기간 | 기준 | 검색창 | 검색버튼)
//CommonBoard: 페이지 넘버(페이지네이션) / 검색창 (기간 | 기준 | 검색창 | 검색버튼)

const StyledBoardBottomOption = styled.div``;

const StyledPostBtn = styled.div`
  margin-top: 9px;
  text-align: right;

  .write {
    &::before {
      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_white_72ca546e.svg);
      background-repeat: no-repeat;
      vertical-align: top;

      background-position: -84px -90px;
      width: 12px;
      height: 12px;

      content: "";
      margin: 3px 6px 0 0;
    }

    width: 74px;
    padding: 9px 0;

    display: inline-block;
    min-width: 56px;
    height: 36px;

    box-sizing: border-box;
    border: 1px solid #d3d3d3;
    text-align: center;
    vertical-align: top;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PostBtn = () => {
  return (
    <StyledPostBtn>
      <Link to={""} className="write">
        글쓰기
      </Link>
    </StyledPostBtn>
  );
};

const StyledListSearch = styled.div`
  padding: 16px 0 16px;
  border-top: 1px solid #ebebea;
  border-top-color: #ebebea;
  background-color: #f9f9f8;
  text-align: center;

  .select_component {
    width: 144px;
    background-color: #fff;
    display: inline-block;
    position: relative;
    height: 36px;
    box-sizing: border-box;
    border: solid 1px #ddd;
    text-align: left;
    vertical-align: top;

    margin: 0 2px 0 2px;

    &:hover {
      cursor: pointer;
    }

    .text {
      color: #333;
      display: block;
      position: relative;
      height: 34px;
      padding: 9px 36px 0 12px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .input_search_area {
    display: inline-block;
    margin: 0 2px 0 2px;

    .input_component {
      display: inline-block;
      width: 200px;
      border-right: 0;
      background-color: #fff;
      position: relative;
      height: 36px;
      box-sizing: border-box;
      border: solid 1px #ddd;
      vertical-align: top;

      input {
        background-color: #fff;
        color: #333;
        width: 100%;
        height: 100%;
        padding: 0 12px;
        margin: 0;
        font-size: 13px;
        border: 0;
        box-sizing: border-box;
      }
    }

    button {
      all: unset;
    }

    .btn-search-grean {
      display: inline-block;
      width: 56px;
      height: 36px;
      background-color: #03c75a;
      border: 0;
      color: #fff;
      margin: 0;
      padding: 0;
      font-size: 13px;
    }
  }
`;

const ListSearch = () => {
  return (
    <StyledListSearch>
      <div className="select_component">
        <p className="text">전체기간</p>
      </div>
      <div className="select_component">
        <p className="text">제목만</p>
      </div>
      <div className="input_search_area">
        <div className="input_component">
          <input type="text" placeholder="검색어를 입력해주세요"></input>
        </div>
        <button className="btn-search-grean">검색</button>
      </div>
    </StyledListSearch>
  );
};

export const BoardBottomOption = ({ boardId }: { boardId: number }) => {
  return (
    <StyledBoardBottomOption>
      <PostBtn></PostBtn>
      <Pagination boardId={boardId}></Pagination>
      <ListSearch></ListSearch>
    </StyledBoardBottomOption>
  );
};

//PopularBoard
//미구현:  tip_layer의 자세히 보기를 선택하지 못하는 에러, svg 아이콘(>)
const StyledPopularBoardBottomOption = styled.div`
  .option_area {
    display: flex;
    align-items: center;
    padding: 15px 0;

    .tip {
      position: relative;

      .txt {
        display: inline-block;
        color: #676767;
        font-size: 13px;
        margin: 0;
        padding: 0;
      }

      .btn_tip {
        display: inline-block;
        position: absolute;
        right: -50px;
        top: -9px;
        height: 16px;
        padding: 8px 30px 8px 0;
        vertical-align: -3px;
        cursor: pointer;

        .questionmark {
          width: 16px;
          height: 16px;

          display: inline-block;
          background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
          background-repeat: no-repeat;
          vertical-align: -6px;

          background-position: -238px -198px;
        }

        .tip_layer {
          display: none;
          position: absolute;
          bottom: 30px;
          width: 230px;
          margin-left: -8px;
          padding: 16px 18px 16px 16px;
          box-sizing: border-box;
          border-radius: 12px;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
          border: 1px solid #e6e6e6;
          background-color: #fff;
          font-size: 13px;
          color: #676767;
          text-align: left;

          p {
            margin: 0;
            padding: 0;
          }

          .link {
            display: inline-block;
            margin-top: 4px;
            text-decoration: underline;
          }
        }

        .questionmark:hover + .tip_layer {
          display: block;
        }

        .tip_layer:hover {
          display: block;
        }
      }
    }
  }

  .btn_link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    margin-top: 20px;
    border-radius: 6px;
    border: 1px solid #eee;
    background-color: #fff;

    .txt {
      margin-left: 12px;
      color: #323232;
      font-size: 14px;
      font-weight: 700;

      strong {
        color: #0076ff;
      }
    }

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export const PopularBoardBottomOption = ({
  currentOrder,
  setCurrentOrder,
}: {
  currentOrder: Order;
  setCurrentOrder: (arg: Order) => void;
}) => {
  return (
    <StyledPopularBoardBottomOption>
      <div className="option_area">
        <div className="tip">
          <p className="txt">
            {" 최근 7일간 작성된 게시글 중 "}
            {currentOrder.p}
            {" 많았던 게시글 입니다."}
          </p>
          <div className="btn_tip">
            <div className="questionmark"></div>
            <div className="tip_layer">
              <p>
                카페 운영원칙과 맞지 않는 게시글은 개별 카페 관리자에 의해
                인기글 목록에서 제외될 수 있습니다.
              </p>
              <Link to={""} className="link">
                자세히보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="btn_link"
        onClick={() => setCurrentOrder(orderList[currentOrder.nextIndex])}
      >
        <span className="txt">
          우리 카페의 <strong>{currentOrder.strong}</strong> 지금 확인해보세요!
        </span>
      </div>
    </StyledPopularBoardBottomOption>
  );
};
