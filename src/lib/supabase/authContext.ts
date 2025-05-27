import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
