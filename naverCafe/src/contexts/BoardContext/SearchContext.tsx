/* eslint-disable react-refresh/only-export-components */
//게시판 하단의 검색창과 검색 페이지 상단의 검색창끼리 같은 값을 공유하기 위해 만든 context입니다.
//공유하는 값: item(검색창에 입력하는 값), term(startDate, endDate), contentOp(searchCategory), boardOp(boardId)

import { useState, createContext, useContext, ReactNode } from "react";
import { ArticleType } from "../../Types";

interface SearchState {
  item: string;
  startDate: string;
  endDate: string;
  contentOp: number;
  boardOp: number;
  termOp: number;
  searchRes: ArticleType[];
  setItem: (arg: string) => void;
  setStartDate: (arg: string) => void;
  setEndDate: (arg: string) => void;
  setContentOp: (arg: number) => void;
  setBoardOp: (arg: number) => void;
  setTermOp: (arg: number) => void;
  setSearchRes: (arg: ArticleType[]) => void;
}

export const SearchContext = createContext<SearchState>({
  item: "",
  startDate: "",
  endDate: "",
  contentOp: 0,
  boardOp: 0,
  termOp: 0,
  searchRes: [],
  setItem: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  setContentOp: () => {},
  setBoardOp: () => {},
  setTermOp: () => {},
  setSearchRes: () => {},
});

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const date = new Date();
  const currentDate = new Date(date);

  const pastDate = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 200)
  );
  const startDateInitialValue = pastDate.toISOString().split("T")[0]+"T00:00:00";

  const [startDate, setStartDate] = useState(startDateInitialValue);
  const [endDate, setEndDate] = useState(date.toISOString().split("T")[0]+"T23:59:59");
  const [item, setItem] = useState("");
  const [contentOp, setContentOp] = useState(0);
  const [boardOp, setBoardOp] = useState(0);
  const [termOp, setTermOp] = useState(0);

  const [searchRes, setSearchRes] = useState<ArticleType[]>([]);

  return (
    <SearchContext.Provider
      value={{
        item,
        startDate,
        endDate,
        contentOp,
        boardOp,
        termOp,
        searchRes,
        setItem,
        setStartDate,
        setEndDate,
        setContentOp,
        setBoardOp,
        setTermOp,
        setSearchRes,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export function formatDate(value: string) {
  if (value.length <= 4) {
    return value;
  } else if (value.length <= 6) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}`;
  } else {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
  }
}

export function calculatePastDateISO(option: string) {
  const currentDate = new Date();
  switch (option) {
    case "전체기간":
      currentDate.setFullYear(currentDate.getFullYear() - 200);
      break;
    case "1일":
      currentDate.setDate(currentDate.getDate() - 1);
      break;
    case "1주":
      currentDate.setDate(currentDate.getDate() - 7);
      break;
    case "1개월":
      currentDate.setMonth(currentDate.getMonth() - 1);
      break;
    case "6개월":
      currentDate.setMonth(currentDate.getMonth() - 6);
      break;
    case "1년":
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    default:
      throw new Error("올바르지 않은 옵션입니다.");
  }
  return currentDate.toISOString().split("T")[0]+"T00:00:00";
}
