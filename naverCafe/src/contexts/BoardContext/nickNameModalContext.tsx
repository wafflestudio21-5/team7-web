//닉네임을 클릭했을 때 모달을 띄우고, 모달에 클릭된 사용자 정보를 넘겨주기 위한 context입니다.

import { ReactNode, createContext, useRef, useState } from "react";

export const NickModalContext = createContext({});

export const NickModalContextProvider =  ({ children }: { children: ReactNode }) => {
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const triggerElementRef = useRef(null);

    return (
        <NickModalContext.Provider value={{ modalPosition, setModalPosition, isModalVisible, setIsModalVisible, triggerElementRef }}>
            {children}
        </NickModalContext.Provider>
    )
};