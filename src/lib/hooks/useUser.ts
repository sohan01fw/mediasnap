import { useMutation } from "@tanstack/react-query";
import { getUser } from "../services/userService";

export function useGetUser() {
  return useMutation({
    mutationFn: getUser,
  });
}
