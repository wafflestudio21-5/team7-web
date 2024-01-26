//BoardHeader 에서 토글하는 공지글 on.off context
//공지글 리스트도 함께 다루려고 했는데, 공지글을 따로 모은 api를 만들어주신다는 것 같아서 일단 뒀습니다.

import { ReactNode, createContext, useContext, useState } from "react";

interface NoticeState {
  isNoticeOff: boolean;
  setIsNoticeOff: (arg: boolean) => void;
}

export const NoticeContext = createContext<NoticeState>({
  isNoticeOff: false,
  setIsNoticeOff: () => {},
});

export const NoticeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isNoticeOff, setIsNoticeOff] = useState(false);
  return (
    <NoticeContext.Provider value={{ isNoticeOff, setIsNoticeOff }}>
      {children}
    </NoticeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNoticeContext = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error();
  return { ...context };
};
