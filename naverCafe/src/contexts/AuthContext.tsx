import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  myNickname: string;
} | null>(null);
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("can't find AuthContext");
  return context;
}
