import { create } from "zustand";

type UserState = {
  role: string | null;
  setRole: (role: string | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
}));

type userPostsDelState = {
  delPostsCount: number;
  setDelPostsCount: (delPostsCount: number) => void;
};

export const useUserPostsDelStore = create<userPostsDelState>((set) => ({
  delPostsCount: 0,
  setDelPostsCount: (delPostsCount) => set({ delPostsCount }),
}));
