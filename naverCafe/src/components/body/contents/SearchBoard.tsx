// SearchBar에 특정 검색어로 검색했을 때 뜨는 게시판

import styled from "styled-components";
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
import { usePagination } from "../../../contexts/BoardStyle/BoardBottomContext/PaginationContext";
import { searchArticles } from "../../../API/SearchAPI";
import { ArticleBriefType, ArticleType } from "../../../Types";
import {
  calculatePastDateISO,
  formatDate,
  useSearch,
} from "../../../contexts/BoardContext/SearchContext";

//BoardBottomOption 의 ListSearch를 재활용하고 싶지만...
const StyledSearchInput = styled.div`
  background-color: #f9f9f8;
  padding: 16px;
  font-size: 13px;
  font-weight: 400;
  color: #333;
  display: flex;
  align-items: center;

  & > div:last-child {
    margin-left: auto;
    margin-right: 10px;
    vertical-align: middle;
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

const DetailButton = styled.button<{ $isSelected: boolean }>`
  all: unset;
  margin-left: auto;
  &:hover {
    //text-decoration: underline;
    cursor: pointer;
  }
  &::after {
    content: "";
    display: inline-block;
    background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
    background-repeat: no-repeat;
    background-position: ${(prop) =>
      prop.$isSelected ? "-25px -250px" : "-229px -185px"};
    width: 12px;
    height: 5px;
    top: -2px;
    left: 4px;
    position: relative;
  }

  ${({ disabled }) =>
    disabled &&
    `
    color: #b4b4b4;
    cursor: not-allowed;
  `}
`;

const DetailSearchDiv = styled.div<{ $isSelected: boolean }>`
  display: ${(prop) => (prop.$isSelected ? "block" : "none")};
  border-top: 1px solid #ebebea;
  background-color: #f9f9f8;
  padding: 16px;
  font-size: 13px;
  font-weight: 400;
  color: #333;

  .input_component {
    width: 191px;
    margin-right: 3px;
    background-color: #fff;
    display: inline-block;
    position: relative;
    height: 36px;
    box-sizing: border-box;
    border: solid 1px #ddd;
    vertical-align: top;
  }

  input {
    width: 164px;
    padding-right: 0;
    font-size: 12px;
    height: 100%;
    border: 0;
    box-sizing: border-box;
    &::placeholder {
      color: #b4b4b4;
    }
  }

  button {
    display: inline-block;
    min-width: 52px;
    height: 36px;
    box-sizing: border-box;
    border: solid 1px rgba(0, 0, 0, 0.1);
    background-color: #5a5a5a;
    cursor: pointer;

    &::before {
      display: inline-block;
      background-image: url(https://ssl.pstatic.net/static/cafe/cafe_pc/sp/sp_icon_06952b76.svg);
      background-repeat: no-repeat;
      vertical-align: top;
      content: "";
      background-position: -229px -157px;
      width: 16px;
      height: 20px;
    }
  }
`;

type SearchBody = {
  size: number;
  page: number;
  setTotPage: (arg: number) => void;
  item: string;
  setItem: (arg: string) => void;
  boardOp: number;
  setBoardOp: (arg: number) => void;
  contentOp: number;
  setContentOp: (arg: number) => void;
  startDate: string;
  setStartDate: (arg: string) => void;
  endDate: string;
  setEndDate: (arg: string) => void;
  wordInclude: string;
  setWordInclude: (arg: string) => void;
  wordExclude: string;
  setWordExclude: (arg: string) => void;
  addItem: string;
  setAddItem: (arg: string) => void;
  setSearchRes: (arg: ArticleType[]) => void;
};

const SearchTopDiv = ({ searchBody }: { searchBody: SearchBody }) => {
  const totDivStyle: React.CSSProperties = {
    marginBottom: "35px",
    position: "relative",
  };

  const {
    size,
    page,
    setTotPage,
    wordInclude,
    setWordInclude,
    wordExclude,
    setWordExclude,
    item,
    setItem,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    addItem,
    setAddItem,
    setSearchRes,
  } = searchBody;

  const { termOp, setTermOp } = useSearch();

  //상세검색 버튼
  const [isDetailClicked, setIsDetailClicked] = useState(false);

  //기간
  const TermOption = ["전체기간", "1일", "1주", "1개월", "6개월", "1년"];
  const [isTermSelected, setIsTermSelected] = useState(false);

  const handleTermOp = (arg: number) => {
    setTermOp(arg);
    setIsTermSelected(!isTermSelected);

    const now = new Date();
    setStartDate(calculatePastDateISO(TermOption[arg]));
    console.log(calculatePastDateISO(TermOption[arg]));
    setEndDate(now.toISOString().split(".")[0]);
  };

  //기간 입력
  const [firstDate, setFirstDate] = useState("2024-01-01");
  const [secondDate, setSecondDate] = useState("2024-02-01");

  const handleFirstDateChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 추출
    setFirstDate(formatDate(value));
  };

  const handleSecondDateChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/\D/g, ""); // 숫자만 추출
    setSecondDate(formatDate(value));
  };

  const handleSetBtnClick = () => {
    setStartDate(firstDate + "T00:00:00");
    setEndDate(secondDate + "T23:59:59");
  };

  //게시판
  const { boardList } = useWholeBoard();
  const wholeBoard = boardList?.boards ?? [];
  const BoardOption = [{ id: 0, name: "전체게시판" }, ...wholeBoard];
  const [isBoardSelected, setIsBoardSelected] = useState(false);
  const { boardOp, setBoardOp } = searchBody;

  const boardName = BoardOption[boardOp]
    ? BoardOption[boardOp].name
    : "로딩 중...";

  const handleBoardOp = (arg: number) => {
    setBoardOp(arg);
    setIsBoardSelected(!isBoardSelected);
  };

  //제목, 내용
  const ContentOption = [
    "게시글 + 댓글",
    "제목만",
    "글작성자",
    "댓글내용",
    "댓글작성자",
  ];
  const [isContentSelected, setIsContentSelected] = useState(false);
  const { contentOp, setContentOp } = searchBody; //ContentOption의 인덱스를 저장

  const handleContentOp = (arg: number) => {
    setContentOp(arg);
    setIsContentSelected(!isContentSelected);
  };

  //초기화
  useEffect(() => {
    //setTermOp(0);
    setContentOp(0);
    //setBoardOp(0);
  }, []);
  useEffect(() => {
    setIsDetailClicked(false);
  }, [contentOp]);

  //검색 버튼 클릭
  const handleSearch = async () => {
    if (item === "") {
      alert("검색어를 입력하세요");
    } else {
      try {
        const fetchedSearchRes: ArticleBriefType = await searchArticles({
          size,
          page,
          boardId: boardOp,
          item,
          contentOp,
          startDate,
          endDate,
          wordInclude,
          wordExclude,
        });
        setSearchRes(fetchedSearchRes.content);
        setTotPage(fetchedSearchRes.totalPages);
      } catch (err) {
        console.log("Error fetching SearchRes in SearchTopDiv");
      }
    }
  };

  //리프레쉬버튼클릭
  const handleRefresh = () => {
    setWordInclude("");
    setWordExclude("");
    setAddItem("");
  };

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
                  value={firstDate}
                  onChange={handleFirstDateChange}
                />
                <input
                  type="text"
                  className="input_2"
                  maxLength={10}
                  value={secondDate}
                  onChange={handleSecondDateChange}
                />
                <button className="btn_set" onClick={handleSetBtnClick}>
                  설정
                </button>
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
            {boardName}
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
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <button className="btn-search-grean" onClick={handleSearch}>
            검색
          </button>
        </div>

        <DetailButton
          $isSelected={isDetailClicked}
          onClick={() => {
            if (contentOp !== 2 && contentOp !== 4) {
              setIsDetailClicked(!isDetailClicked);
            }
          }}
          disabled={contentOp === 2 || contentOp === 4}
        >
          상세 검색
        </DetailButton>
      </StyledSearchInput>{" "}
      {/* 논리 연산자까지 고려해서 검색을 해야하는 걸까... 일단 tip layer는 제외 */}
      <DetailSearchDiv
        $isSelected={isDetailClicked && contentOp !== 2 && contentOp !== 4}
      >
        <div className="input_component">
          <input
            type="text"
            placeholder="다음 단어 모두 포함"
            value={wordInclude}
            onChange={(e) => setWordInclude(e.target.value)}
          />
        </div>
        <div className="input_component">
          <input
            type="text"
            placeholder="다음 단어 제외"
            value={wordExclude}
            onChange={(e) => setWordExclude(e.target.value)}
          />
        </div>
        <div className="input_component">
          <input
            type="text"
            placeholder="다음 단어 중 1개 이상 포함"
            value={addItem}
            onChange={(e) => setAddItem(e.target.value)}
          />
        </div>
        <button onClick={handleRefresh} />
      </DetailSearchDiv>
    </div>
  );
};

//BoardTopOption 의 SortArea를 재활용하고 싶지만...
//나머지 선택자는 구현X
const SearchListDiv = () => {
  const totDivStyle: React.CSSProperties = {
    padding: "6px 0 10px",
    display: "flex",
    justifyContent: "flex-end",
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
  const { setSize } = usePagination();

  const handleSortOp = (arg: number) => {
    const sortNum = SortOption[arg].match(/\d+/);
    setSize(parseInt(sortNum![0], 10));
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
  const {
    item,
    setItem,
    boardOp,
    setBoardOp,
    contentOp,
    setContentOp,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useSearch();
  const [wordInclude, setWordInclude] = useState("");
  const [wordExclude, setWordExclude] = useState("");

  const [addItem, setAddItem] = useState("");
  const { size, page, setSize, setPage, setTotPage } = usePagination();

  const { searchRes, setSearchRes } = useSearch();
  //const location = useLocation();

  const searchBody = {
    size,
    page,
    setTotPage,
    item,
    setItem,
    boardOp,
    setBoardOp,
    contentOp,
    setContentOp,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    wordInclude,
    setWordExclude,
    wordExclude,
    setWordInclude,
    addItem,
    setAddItem,
    setSearchRes,
  };

  useEffect(() => {
    async function fetchSearchResult() {
      try {
        const fetchedSearchRes: ArticleBriefType = await searchArticles({
          size,
          page,
          boardId: boardOp,
          item: addItem ? `${item},${addItem}` : item,
          contentOp,
          startDate,
          endDate,
          wordInclude,
          wordExclude,
        });
        setSearchRes(fetchedSearchRes.content);
        setTotPage(fetchedSearchRes.totalPages);
      } catch (err) {
        console.log("Error fetching SearchRes");
      }
    }

    fetchSearchResult();
  }, [size, page, setTotPage]);

  useEffect(() => {
    console.log(`item: ${item}, boardId: ${boardOp}`);
    console.log(
      `contentOp: ${contentOp}, startDate: ${startDate}, endDate: ${endDate}`
    );
    setSize(15);
    setPage(1);
    setBoardOp(0);
  }, []);

  return (
    <div>
      <SearchTopDiv searchBody={searchBody} />
      <SearchListDiv />
      <ArticleTable
        board={boardAttribute.SearchBoard}
        articleList={searchRes}
      />
      <BoardBottomOption boardId={boardOp} noPost />
    </div>
  );
};
export default SearchBoard;

//검색 게시판에 추가기능이 있으면 좋겠다. (빠진 부분이 좀 있는 편이니까)
