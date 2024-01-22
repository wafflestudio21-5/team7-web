import { styled, css } from "styled-components";
import { Order, orderList } from "../../components/body/contents/PopularBoard";

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

const StyledSortArea = styled.div`
  .check_box {
    display: inline-block;
    margin: 7px 0 0 8px;
    vertical-align: top;

    input {
      -webkit-appearance: none;
      float: left;
      padding: 0;
      all: unset;

      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_white_72ca546e.svg);
      background-repeat: no-repeat;
      vertical-align: -0.1px;
      background-position: -28px -66px;
      width: 16px;
      height: 16px;

      margin: 0px 6px 0 0;
    }

    label {
      color: #333;

      line-height: 16px;
      margin: 0px 6px 0 0;
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
        background-position: -261px -122px;
      }
    }
  }
`;

const SortArea = () => {
  return (
    <StyledSortArea>
      <div className="check_box">
        <input type="check_box"></input>
        <label htmlFor="notice_hidden">공지 숨기기</label>
      </div>
      <div className="sort_form">
        <button className="sort_card"></button>
        <button className="sort_album"></button>
        <button className="sort_list"></button>
      </div>
      <div className="select_listsize"></div>
    </StyledSortArea>
  );
};

export const CommonBoardTopOption = () => {
  return (
    <StyledBoardTopOption>
      <SortArea />
    </StyledBoardTopOption>
  );
};

export const TotalBoardTopOption = () => {
  return (
    <StyledTotalBoardTopOption>
      <span className="total">
        <em>9</em>개의 글
      </span>
      <SortArea></SortArea>
    </StyledTotalBoardTopOption>
  );
};

//PopularBoard: 인기글Top | 댓글Top | 좋아요Top | 게시글 표시 기준(최근 7일)
const StyledPopularBoardTopOption = styled.div`
  display: flex;
  padding: 6px 0 10px;
  justify-content: space-between;

  .sort_area {
    margin: 14px 0 10px;
    width: 95px;

    .form_select_box {
      button {
        height: 36px;
        font-size: 14px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
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

export const PopularBoardTopOption = ({
  currentOrder,
  setCurrentOrder,
}: {
  currentOrder: Order;
  setCurrentOrder: (arg: Order) => void;
}) => {
  return (
    <StyledPopularBoardTopOption>
      <TabButton
        currentOrder={currentOrder}
        setCurrentOrder={setCurrentOrder}
      ></TabButton>
      <div className="sort_area">
        <div className="form_select_box">
          <button>최근 7일</button>
        </div>
      </div>
    </StyledPopularBoardTopOption>
  );
};
