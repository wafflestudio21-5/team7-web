import { createContext, useContext} from "react";
import { type UserLoginInput } from "../Types";
import { error } from "console";

export const AuthContext = createContext<{
  login: (username: string, password: string) => void;
  auth: { token: string, logout: () => void; userInfo: UserLoginInput } | null;
}>({
  login: (username: string, password: string): void => {
    throw new Error("Not implemented");
  },
  auth: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const auth = useContext(AuthContext).auth;
  if (!auth) throw error("Cannot find AuthContext");
  return auth;
}