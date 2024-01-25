import { styled, css } from "styled-components";
import { Order, orderList } from "../../components/body/contents/PopularBoard";
import { useNoticeContext } from "../BoardContext/NoticeContext";
import { ChangeEvent, useEffect, useState } from "react";
import { usePagination } from "./BoardBottomContext/PaginationContext";

//CommonBoard: - | 공지 숨기기 | 게시글 보기 형식 | 게시글 표시 개수
const StyledBoardTopOption = styled.div`
  padding: 6px 0 10px;
  display: flex;
  justify-content: flex-end;
`;

//TotalBoard: 글 개수 | 공지 숨기기 | 게시글 보기 형식 | 게시글 표시 개수
const StyledTotalBoardTopOption = styled(StyledBoardTopOption)`
  justify-content: space-between;
  .total {
    display: inline-block;
    margin: 8px 0 0 0;
    font-size: 13px;
    vertical-align: top;
    color: #333;

    em {
      font-weight: 500;
      font-style: normal;
    }
  }
`;

const StyledSortArea = styled.div<{ $viewOp: string }>`
  .check_box {
    display: inline-block;
    margin: 7px 0 0 8px;
    vertical-align: top;

    input {
      -webkit-appearance: none;
      float: left;
      width: 0;
      opacity: 0;
      margin: 0;
      padding: 0;
    }

    label {
      color: #333;
      line-height: 16px;
      vertical-align: middle;
    }

    input + label:before,
    input:checked + label:before {
      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_white_72ca546e.svg);
      background-repeat: no-repeat;
      vertical-align: top;
    }

    input + label:before {
      content: "";
      background-position: -28px -66px;
      width: 16px;
      height: 16px;
      margin: 1.5px 6px 0px 0px;
    }

    input:checked + label:before {
      content: "";
      background-position: -4px -66px;
      width: 16px;
      height: 16px;
      margin: 1.5px 6px 0px 0px;
    }
  }

  .sort_form {
    border-left: 1px solid #e5e5e5;
    display: inline-block;
    height: 23px;
    margin-left: 14px;
    padding: 7px 0 0 4px;
    vertical-align: top;

    button {
      all: unset;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
      vertical-align: top;
      cursor: pointer;

      margin-left: 12px;
      width: 14px;
      height: 16px;

      &.sort_card {
        background-position: -207px -112px;
      }

      &.sort_album {
        background-position: -207px -40px;
      }

      &.sort_list {
        background-position: -261px -146px;
      }
      ${(props) => {
        switch (props.$viewOp) {
          case "sort_card":
            return css`
              &.${props.$viewOp} {
                background-position: -207px -64px;
              }
            `;

          case "sort_album":
            return css`
              &.${props.$viewOp} {
                background-position: -207px -88px;
              }
            `;

          case "sort_list":
            return css`
              &.${props.$viewOp} {
                background-position: -261px -122px;
              }
            `;
        }
      }}
    }
  }
`;

const StyledSortListDiv = styled.div<{ $isSelected: boolean }>`
  display: inline-block;
  position: relative;
  height: 30px;
  width: 88px;
  margin-left: 13px;
  box-sizing: border-box;
  border: solid 1px #ddd;
  background-color: #fff;

  .select_box {
    text-align: left;
    display: block;
    position: relative;
    height: 28px;
    padding: 6px 0 0 8px;
    box-sizing: border-box;
    font-size: 12px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &::after {
      content: "";
      position: absolute;
      top: ${(prop) => (prop.$isSelected ? "8px" : "12px")};
      right: 8px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px;
      border-color: ${(prop) =>
        prop.$isSelected
          ? "transparent transparent #777 transparent;"
          : "#777 transparent transparent transparent"};
    }
  }

  .select_list {
    display: ${(prop) => (prop.$isSelected ? "block" : "none")};
    position: absolute;
    top: 28px;
    left: -1px;
    width: 100%;
    border: solid 1px #ddd;
    background-color: #fff;
    z-index: 1;
  }

  .select_list > li {
    display: block;
    height: 30px;
    padding: 0 12px;
    font-size: 12px;
    line-height: 30px;
    color: #333;
    cursor: pointer;
    text-align: left;

    &:hover {
      text-decoration: underline;
      background-color: #e7f9eb;
      color: #5cc569;
    }
  }
`;

const SortArea = ({ boardId }: { boardId: number }) => {
  const { setItemsPerPage } = usePagination(boardId);

  //공지 토글
  const { isNoticeOff, setIsNoticeOff } = useNoticeContext();
  const handleNoticeOn = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNoticeOff(e.target.checked);
  };

  //한 페이지당 글 개수로 정렬
  const [isSortSelected, setIsSortSelected] = useState(false);
  const SortOption = [
    "5개씩",
    "10개씩",
    "15개씩",
    "20개씩",
    "30개씩",
    "40개씩",
    "50개씩",
  ];
  const [sortOp, setSortOp] = useState(2); //SortOption의 인덱스를 저장

  const handleSortOp = (arg: number) => {
    const sortNum = SortOption[arg].match(/\d+/);
    setItemsPerPage(parseInt(sortNum![0], 10));
    setSortOp(arg);
    setIsSortSelected(!isSortSelected);
  };

  useEffect(() => {
    setSortOp(2);
  }, [boardId]);

  //게시물 유형별 정렬
  //미구현: 클릭시 실제 view 변경
  const ViewOption = ["sort_card", "sort_album", "sort_list"];
  const [viewOp, setViewOp] = useState(2); //ViewOption의 인덱스를 저장

  const handleViewOp = (arg: number) => {
    setViewOp(arg);
    console.log(viewOp);
  };

  return (
    <StyledSortArea $viewOp={ViewOption[viewOp]}>
      <div className="check_box">
        <input
          type="checkbox"
          id="notice_hidden"
          checked={isNoticeOff}
          onChange={(e) => handleNoticeOn(e)}
        ></input>
        <label htmlFor="notice_hidden">공지 숨기기</label>
      </div>
      <div className="sort_form">
        <button className="sort_card" onClick={() => handleViewOp(0)}></button>
        <button className="sort_album" onClick={() => handleViewOp(1)}></button>
        <button className="sort_list" onClick={() => handleViewOp(2)}></button>
      </div>
      <StyledSortListDiv
        className="select_listsize"
        $isSelected={isSortSelected}
      >
        <p
          className="select_box"
          onClick={() => setIsSortSelected(!isSortSelected)}
        >
          {SortOption[sortOp]}
        </p>
        {/* 원본 카페에서도 리스트 밖의 영역을 선택했을 때 닫히는 기능이 없어서 일단 이렇게 두었습니다. */}
        <ul className="select_list">
          <li onClick={() => handleSortOp(0)}>5개씩</li>
          <li onClick={() => handleSortOp(1)}>10개씩</li>
          <li onClick={() => handleSortOp(2)}>15개씩</li>
          <li onClick={() => handleSortOp(3)}>20개씩</li>
          <li onClick={() => handleSortOp(4)}>30개씩</li>
          <li onClick={() => handleSortOp(5)}>40개씩</li>
          <li onClick={() => handleSortOp(6)}>50개씩</li>
        </ul>
      </StyledSortListDiv>
    </StyledSortArea>
  );
};

export const CommonBoardTopOption = ({ boardId }: { boardId: number }) => {
  return (
    <StyledBoardTopOption>
      <SortArea boardId={boardId} />
    </StyledBoardTopOption>
  );
};

export const TotalBoardTopOption = () => {
  //articleLength를 prop으로 받으면 됩니다.
  return (
    <StyledTotalBoardTopOption>
      <span className="total">
        <em>9</em>개의 글
      </span>
      <SortArea boardId={0}></SortArea>
    </StyledTotalBoardTopOption>
  );
};

//------------------------------------------------------------------------------------------------------

//PopularBoard: 인기글Top | 댓글Top | 좋아요Top | 게시글 표시 기준(최근 7일)
const StyledPopularBoardTopOption = styled.div`
  display: flex;
  padding: 6px 0 10px;
  justify-content: space-between;

  .sort_area {
    margin: 14px 0 10px;
    width: 95px;
    float: right;
  }
`;

const StyledButton = styled.button<{ $selected: boolean }>`
  background: none;
  all: unset;

  display: inline-block;
  height: 39px;
  margin-right: 8px;
  padding: 0 15px;
  box-sizing: border-box;
  border: 1px solid #eeeeef;
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  color: #676767;
  line-height: 39px;

  ${(props) => {
    switch (props.$selected) {
      case true:
        return css`
          border-color: transparent;
          background-color: rgba(3, 199, 90, 0.12);
          color: #009f47;
        `;
    }
  }}
`;

const StyledTabButton = styled.div`
  margin: 14px 0 10px;
`;

const TabButton = ({
  currentOrder,
  setCurrentOrder,
}: {
  currentOrder: Order;
  setCurrentOrder: (arg: Order) => void;
}) => {
  return (
    <StyledTabButton>
      <StyledButton
        $selected={currentOrder === orderList[0]}
        className="tab_btn"
        onClick={() => setCurrentOrder(orderList[0])}
      >
        <span className="tab_name">인기글</span>
      </StyledButton>
      <StyledButton
        $selected={currentOrder === orderList[1]}
        className="tab_btn"
        onClick={() => setCurrentOrder(orderList[1])}
      >
        <span className="tab_name">댓글 TOP</span>
      </StyledButton>
      <StyledButton
        $selected={currentOrder === orderList[2]}
        className="tab_btn"
        onClick={() => setCurrentOrder(orderList[2])}
      >
        <span className="tab_name">좋아요 TOP</span>
      </StyledButton>
    </StyledTabButton>
  );
};

const StyledFormSelectDiv = styled.div<{ $isSelected: boolean }>`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 95px;
  & > button {
    height: 36px;
    border-radius: 6px;
    display: inline-block;
    position: relative;
    width: 100%;
    padding: 0 25px 0 11px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    color: #000;
    text-align: left;
    box-sizing: border-box;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;

    svg {
      //위치를 고정시켜야 하는데 어떻게 해야할지 몰라서 일단은 놔두었습니다.

      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
      vertical-align: top;
      background-position: ${(prop) =>
        prop.$isSelected ? "-304px -262px" : "-304px -251px"};
      width: 10px;
      height: 10px;
      margin-top: 2px;
      margin-left: 10px;
      z-index: 1;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }

    &::after {
    }
  }
`;

const StyledOptionList = styled.div<{ $isSelected: boolean }>`
  transition: opacity 0.3s ease;
  border-color: rgb(0 0 0 / 6%);
  background-color: #fff;
  color: #000;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  max-height: 324px;
  margin-top: 2px;
  padding: 8px 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  font-size: 14px;

  display: ${(prop) => (prop.$isSelected ? "" : "none")};

  button {
    cursor: pointer;
    border: 0;
    background: none;
  }

  .option_list {
    display: block;
  }
  .option {
    display: block;
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 93px;
    height: 32px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 33px;
    white-space: nowrap;
    color: #000;

    &:hover {
      text-decoration: underline;
      color: #03c75a;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
`;

//sortOption에 따른 리스트 변화 미구현

export const PopularBoardTopOption = ({
  currentOrder,
  setCurrentOrder,
}: {
  currentOrder: Order;
  setCurrentOrder: (arg: Order) => void;
}) => {
  const [isSortSelected, setIsSortSelected] = useState(false);
  const SortOption = ["최근 7일", "최근 30일", "전체"];
  const [selectedOp, setSelectedOp] = useState(0); //선택된 SortOption의 인덱스

  const handleSelectOp = (arg: number) => {
    setIsSortSelected(!isSortSelected);
    setSelectedOp(arg);
  };
  return (
    <StyledPopularBoardTopOption>
      <TabButton
        currentOrder={currentOrder}
        setCurrentOrder={setCurrentOrder}
      ></TabButton>
     {!(currentOrder.type === "인기순") ? <div className="sort_area">
        <StyledFormSelectDiv
          className="form_select_box"
          $isSelected={isSortSelected}
        >
          <button
            onClick={() => {
              setIsSortSelected(!isSortSelected);
            }}
          >
            {SortOption[selectedOp]}
            <svg></svg>
          </button>
          <StyledOptionList
            className="select_option"
            $isSelected={isSortSelected}
          >
            <ul className="option_list">
              {SortOption.map((option, index) => (
                <li className="item" key={index}>
                  <button
                    type="button"
                    className="option"
                    onClick={() => handleSelectOp(index)}
                  >
                    <span className="option_text">{option}</span>
                  </button>
                </li>
              ))}
            </ul>
          </StyledOptionList>
        </StyledFormSelectDiv>
      </div> : null}
    </StyledPopularBoardTopOption>
  );
};
