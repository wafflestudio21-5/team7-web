import { createContext, useContext } from "react";

export const UserContext = createContext<{
  userId: string;
  username: string;
  userNickname: string;
} | null>(null);
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Cannot find UserContext");
  return context;
}
