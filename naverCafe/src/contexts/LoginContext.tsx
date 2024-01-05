import { ReactNode, createContext, useContext, useState } from "react";
import axios from "axios";
import axiosT from "./AxiosT";
import { getCookie, setCookie } from "./Cookie";

export type UserInfotype = {
  username: string;
  password: string;
};

export type LogInType = {
  isLogIn: boolean;
  setIsLogIn: (arg: boolean) => void;
  userInfo: UserInfotype;
  setUserInfo: (arg: UserInfotype) => void;
  UserLogin: (username: string, password: string) => void;
  getUser: () => Promise<string>;
};

export function LogInProvider({ children }: { children: ReactNode }) {
  const [isLogIn, setIsLogIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  function UserLogin(username: string, password: string) {
    setUserInfo({ username: username, password: password });
    return axios
      .post("", userInfo, {
        withCredentials: true,
      })
      .then((result) => {
        const access_token = result.data.access_token;
        const refresh_token = getCookie("refresh_token");

        setCookie("access_token", access_token);
        setCookie("refresh_token", refresh_token);
        setIsLogIn(true);
        return "로그인 성공";
      })
      .catch((error) => {
        setIsLogIn(false);
        console.log("Error logging in:", error);
        if (error.response && error.response.status === 401) {
          return "아이디 혹은 패스워드가 올바르지 않습니다.";
        }
        return "로그인을 다시 시도하세요.";
      });
  }

  async function getUser() {
    try {
      if (isLogIn) {
        const loggedInUser = await axiosT.get(
          ""
        );
        const loggedInUsername = loggedInUser.data.user.username;
        return loggedInUsername;
      }
    } catch (error) {
      console.log("Error getting userinfo: ", error);
    }
  }

  const LogInContextData = {
    isLogIn: isLogIn,
    setIsLogIn: setIsLogIn,
    UserLogin: UserLogin,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    getUser: getUser,
  };
  return (
    <LogInContext.Provider value={LogInContextData}>
      {children}
    </LogInContext.Provider>
  );
}

export const LogInContext = createContext<LogInType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLogInContext = () => {
  const context = useContext(LogInContext);
  const defaultContext: LogInType = {
    isLogIn: false,
    setIsLogIn: () => {},
    userInfo: { username: "", password: "" },
    setUserInfo: () => {},
    UserLogin: () => {},
    getUser: async () => "",
  };
  if (!context) return defaultContext;
  return context;
};
