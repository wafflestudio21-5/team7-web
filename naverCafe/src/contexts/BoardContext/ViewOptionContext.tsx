//BoardTopOption과 ArticleTable이 ViewOption에 대한 state를 공유하기 위한 컨텍스트입니다.

import { ReactNode, createContext, useState } from "react";

interface ViewOptionState {
  ViewOption: string[];
  viewOp: number;
  setViewOp: (arg: number) => void;
}

export const ViewOptionContext = createContext<ViewOptionState>({
  ViewOption: [],
  viewOp: 2,
  setViewOp: () => {},
});

export const ViewOptionStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const ViewOption = ["sort_card", "sort_album", "sort_list"];
  const [viewOp, setViewOp] = useState(2); //
  return (
    <ViewOptionContext.Provider
      value={{ ViewOption, viewOp, setViewOp }}
    >
      {children}
    </ViewOptionContext.Provider>
  );
};
