//게시판 별로 페이지네이션에 필요한 값을 전역적으로 관리하는 context입니다.

import { useState, createContext, useContext, ReactNode } from "react";

interface PaginationState {
  size: number;
  page: number;
  sort: string;
  totPage: number;
  setSize: (arg: number) => void;
  setPage: (arg: number) => void;
  setSort: (arg: string) => void;
  setTotPage: (arg: number) => void;
}

export const PaginationContext = createContext<PaginationState>({
  size: 15,
  page: 0,
  sort: "",
  totPage: 1,
  setSize: () => {},
  setPage: () => {},
  setSort: () => {},
  setTotPage: () => {},
});

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [size, setSize] = useState(15);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [totPage, setTotPage] = useState(1);

  return (
    <PaginationContext.Provider
      value={{
        size,
        page,
        sort,
        setSize,
        setPage,
        setSort,
        totPage,
        setTotPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) throw new Error();
  return { ...context };
};
