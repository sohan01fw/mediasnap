// src/store/useToggleStore.ts
import { create } from "zustand";

interface ToggleState {
  isOpen: boolean;
  toggle: () => void;
}

export const useToggleStore = create<ToggleState>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
