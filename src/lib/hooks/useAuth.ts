import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/authService";
import { useContext } from "react";
import { AuthContext } from "../supabase/authContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
const useSignUp = () =>
  useMutation({
    mutationFn: signUp,
  });

export { useAuthContext, useSignUp };
