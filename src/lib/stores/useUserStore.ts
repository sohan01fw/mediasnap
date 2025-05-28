import { create } from "zustand";

type UserState = {
  role: string | null;
  setRole: (role: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));
