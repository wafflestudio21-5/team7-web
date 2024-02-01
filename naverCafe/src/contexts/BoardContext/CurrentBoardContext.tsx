//현재 화면에 뜨고 있는 보드가 무엇인지 전체적으로 공유하기 위한 Context입니다. (Sidebar bold)

import { ReactNode, createContext, useState } from "react";

interface CurrentBoardState {
  curBoardState: number;
  setCurBoardState: (arg: number) => void;
}

export const CurrentBoardContext = createContext<CurrentBoardState>({
  curBoardState: -2,
  setCurBoardState: () => {},
});

export const CurrentBoardStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  //HomeBoard의 id: -2, PopularBoard의 id: -1, TotalBoard의 id: 0으로 설정하였습니다.
  const [curBoardState, setCurBoardState] = useState(-2);
  return (
    <CurrentBoardContext.Provider value={{ curBoardState, setCurBoardState }}>
      {children}
    </CurrentBoardContext.Provider>
  );
};
