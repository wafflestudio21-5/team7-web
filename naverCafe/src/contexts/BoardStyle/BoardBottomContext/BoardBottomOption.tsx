import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Order,
  orderList,
} from "../../../components/body/contents/PopularBoard";
import { Pagination } from "./Pagination";
import { useEffect, useState } from "react";

//TotalBoard: 페이지 넘버(페이지네이션) / 검색창 (기간 | 기준 | 검색창 | 검색버튼)
//CommonBoard: 페이지 넘버(페이지네이션) / 검색창 (기간 | 기준 | 검색창 | 검색버튼)

const StyledBoardBottomOption = styled.div``;

const StyledPostBtn = styled.div`
  margin-top: 9px;
  text-align: right;
  font-size:13px;
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
      <Link to={"/write"} className="write">
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
  font-size: 13px;

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

export const StyledSelectDiv = styled.div<{ $isSelected: boolean }>`
  .text::after {
    content: "";
    display: inline-block;
    background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
    background-repeat: no-repeat;
    vertical-align: top;
    background-position: ${(prop) =>
      prop.$isSelected ? "-25px -250px" : "-229px -185px"};
    width: 12px;
    height: 5px;
    position: absolute;
    top: 15px;
    right: 12px;
  }
`;

export const StyledUl = styled.ul<{ $isSelected: boolean; $isTerm: boolean;  $isBoard?:boolean}>`
  display: ${(prop) => (prop.$isSelected ? "block" : "none")};
  overflow-y: auto;
  position: absolute;
  top: 34px;
  left: -1px;
  width: ${(prop) => (prop.$isTerm ? "290px" : "100%")};
  max-height: 295px;
  border: solid 1px #ddd;
  background-color: #fff;
  z-index: 12;

  li > p:hover {
    text-decoration: underline;
    background-color: #e2faea;
    color: #03c75a;
  }

  li > p {
    display: block;
    height: 36px;
    padding: 0 12px;
    line-height: 36px;
    color: #333;
    white-space: nowrap;
  }

  li > .date_enter {
    padding: 14px;
    border-top: 1px solid #ddd;
    background-color: #fff;
    height: 45.5px;

    .tit {
      display: block;
      padding-bottom: 6px;
      color: #333;
      height: 15.5px;
    }

    input {
      width: 100px;
      height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border: solid 1px #ddd;
      line-height: 13px;
      color: #333;
      margin-right: 4px;
    }

    .btn_set {
      width: 52px;
      padding: 3px 0 4px;
      background-color: #a4abb9;
      border: 1px solid #9599a6;
      font-size: 14px;
      line-height: 14px;
      color: #fff;
      vertical-align: top;
    }
  }
  .date_input_area {
    height: 74.5px;
  }
`;

const ListSearch = ({ boardId }: { boardId: number }) => {
  //미구현: 검색창에 넘겨주기 (term, content option 넘겨줘서 해당 게시판 전체 게시물 리스트에서 search)

  //기간
  const TermOption = ["전체기간", "1일", "1주", "1개월", "6개월", "1년"];
  const [isTermSelected, setIsTermSelected] = useState(false);
  const [termOp, setTermOp] = useState(0); //TermOption의 인덱스를 저장

  const handleTermOp = (arg: number) => {
    setTermOp(arg);
    setIsTermSelected(!isTermSelected);
  };

  //제목, 내용
  const ContentOption = ["제목만", "글작성자", "댓글내용", "댓글작성자"];
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [contentOp, setContentOp] = useState(0); //ContentOption의 인덱스를 저장

  const handleContentOp = (arg: number) => {
    setContentOp(arg);
    setIsContentSelected(!isContentSelected);
  };

  //게시판이 바뀔 때마다 초기화
  useEffect(() => {
    setTermOp(0);
    setContentOp(0);
  }, [boardId]);

  return (
    <StyledListSearch>
      <StyledSelectDiv
        className="select_component"
        $isSelected={isTermSelected}
      >
        <p
          className="text"
          onClick={() => {
            setIsTermSelected(!isTermSelected);
            setIsContentSelected(false);
          }}
        >
          {TermOption[termOp]}
        </p>
        <StyledUl
          className="select_list"
          $isSelected={isTermSelected}
          $isTerm={true}
        >
          {TermOption.map((option, index) => (
            <li key={index}>
              <p onClick={() => handleTermOp(index)}>{option}</p>
            </li>
          ))}
          <li className="date_input_area">
            <div className="date_enter">
              <span className="tit">기간 입력</span>
              <input
                type="text"
                className="input_1"
                maxLength={10}
                value="2017-12-28"
              />
              <input
                type="text"
                className="input_2"
                maxLength={10}
                value="2018-01-03"
              />
              <button className="btn_set">설정</button>
            </div>
          </li>
        </StyledUl>
      </StyledSelectDiv>
      <StyledSelectDiv
        className="select_component"
        $isSelected={isContentSelected}
      >
        <p
          className="text"
          onClick={() => {
            setIsContentSelected(!isContentSelected);
            setIsTermSelected(false);
          }}
        >
          {ContentOption[contentOp]}
        </p>
        <StyledUl $isSelected={isContentSelected} $isTerm={false}>
          {ContentOption.map((option, index) => (
            <li key={index}>
              <p onClick={() => handleContentOp(index)}>{option}</p>
            </li>
          ))}
        </StyledUl>
      </StyledSelectDiv>
      <div className="input_search_area">
        <div className="input_component">
          <input type="text" placeholder="검색어를 입력해주세요"></input>
        </div>
        <button className="btn-search-grean">검색</button>
      </div>
    </StyledListSearch>
  );
};

export const BoardBottomOption = ({ boardId, noPost }: { boardId: number; noPost?: boolean; }) => {
  return (
    <StyledBoardBottomOption>
      {noPost ? null : <PostBtn />}
      <Pagination />
      <ListSearch boardId={boardId} />
    </StyledBoardBottomOption>
  );
};

//PopularBoard
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

    svg {
      display: inline-block;
      width: 5px;
      height: 8px;
      margin-left: 3px;
      background-image: url("https://ssl.pstatic.net/static/cafe/cafe_pc/svg/ico-detail-arrow-right.svg");
      background-size: 100%;
      background-repeat: no-repeat;
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
        <svg>
          <use xlinkHref="#ico_link_arrow" aria-hidden="true"></use>
        </svg>
      </div>
    </StyledPopularBoardBottomOption>
  );
};
