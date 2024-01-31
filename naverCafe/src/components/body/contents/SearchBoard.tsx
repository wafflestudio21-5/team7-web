// SearchBar에 특정 검색어로 검색했을 때 뜨는 게시판

import styled from "styled-components";
import { aList } from "../../../Constants";
import { boardAttribute } from "../../../contexts/BoardContext/BoardAttrContext";
import { ArticleTable } from "../../../contexts/BoardStyle/ArticleBoardContext/Table";
import {
  BoardBottomOption,
  StyledSelectDiv,
  StyledUl,
} from "../../../contexts/BoardStyle/BoardBottomContext/BoardBottomOption";
import { useState, useEffect } from "react";
import { useWholeBoard } from "../../../API/BoardAPI";
import { StyledSortListDiv } from "../../../contexts/BoardStyle/BoardTopOptionContext";

//BoardBottomOption 의 ListSearch를 재활용하고 싶지만...
const StyledSearchInput = styled.div`
  background-color: #f9f9f8;
  padding: 16px;
  font-size: 13px;
  font-weight: 400;
  color: #333;
  display: flex;
  align-items: center;

  div:last-child {
    margin-left: auto;
    vertical-align:middle;
  }

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

const SearchTopDiv = () => {
  const totDivStyle: React.CSSProperties = {
    marginBottom: "35px",
    position: "relative",
  };

  //기간
  const TermOption = ["전체기간", "1일", "1주", "1개월", "6개월", "1년"];
  const [isTermSelected, setIsTermSelected] = useState(false);
  const [termOp, setTermOp] = useState(0); //TermOption의 인덱스를 저장

  const handleTermOp = (arg: number) => {
    setTermOp(arg);
    setIsTermSelected(!isTermSelected);
  };

  //게시판
  const { boardList } = useWholeBoard();
  const wholeBoard = boardList?.boards ?? [];
  const BoardOption = [{ id: 0, name: "전체게시판" }, ...wholeBoard];
  const [isBoardSelected, setIsBoardSelected] = useState(false);
  const [boardOp, setBoardOp] = useState(0);

  const handleBoardOp = (arg: number) => {
    setBoardOp(arg);
    setIsBoardSelected(!isBoardSelected);
  };

  //제목, 내용
  const ContentOption = ["제목만", "글작성자", "댓글내용", "댓글작성자"];
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [contentOp, setContentOp] = useState(0); //ContentOption의 인덱스를 저장

  const handleContentOp = (arg: number) => {
    setContentOp(arg);
    setIsContentSelected(!isContentSelected);
  };

  //초기화
  useEffect(() => {
    setTermOp(0);
    setContentOp(0);
    setBoardOp(0);
  }, []);

  return (
    <div style={totDivStyle}>
      <StyledSearchInput className="search_input">
        <StyledSelectDiv
          className="select_component"
          $isSelected={isTermSelected}
        >
          <p
            className="text"
            onClick={() => {
              setIsTermSelected(!isTermSelected);
              setIsContentSelected(false);
              setIsBoardSelected(false);
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

        {/* Board */}
        <StyledSelectDiv
          className="select_component"
          $isSelected={isBoardSelected}
        >
          <p
            className="text"
            onClick={() => {
              setIsBoardSelected(!isBoardSelected);
              setIsTermSelected(false);
              setIsContentSelected(false);
            }}
          >
            {BoardOption[boardOp].name}
          </p>
          <StyledUl $isSelected={isBoardSelected} $isTerm={true}>
            {BoardOption.map((option, index) => (
              <li key={index}>
                <p onClick={() => handleBoardOp(index)}>{option.name}</p>
              </li>
            ))}
          </StyledUl>
        </StyledSelectDiv>

        {/* Content */}
        <StyledSelectDiv
          className="select_component"
          $isSelected={isContentSelected}
        >
          <p
            className="text"
            onClick={() => {
              setIsContentSelected(!isContentSelected);
              setIsTermSelected(false);
              setIsBoardSelected(false);
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
            <input type="text" placeholder="검색어를 입력해주세요" />
          </div>
          <button className="btn-search-grean">검색</button>
        </div>

        <div>상세 검색</div>
      </StyledSearchInput>
    </div>
  );
};


//BoardTopOption 의 SortArea를 재활용하고 싶지만...
//나머지 선택자는 구현X
const SearchListDiv = () => {
  const totDivStyle: React.CSSProperties = {
    padding: "6px 0 10px",
    display: "flex",
    justifyContent:"flex-end",
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
    //const sortNum = SortOption[arg].match(/\d+/);
    //setSize(parseInt(sortNum![0], 10));
    setSortOp(arg);
    setIsSortSelected(!isSortSelected);
  };

  return (
    <div style={totDivStyle}>
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
    </div>
  );
};

const SearchBoard = () => {
  return (
    <div>
      <SearchTopDiv />
      <SearchListDiv />
      <ArticleTable board={boardAttribute.SearchBoard} articleList={aList} />
      <BoardBottomOption boardId={0} noPost />
    </div>
  );
};
export default SearchBoard;
