import { createContext, useContext } from "react";

export const UserContext = createContext(null);
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Cannot find UserContext");
  return context;
}
