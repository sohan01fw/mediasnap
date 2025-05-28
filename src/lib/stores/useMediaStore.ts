import { create } from "zustand";

type VideoState = {
  video: File | null;
  setVideo: (file: File | null) => void;
};

export const useVideoStore = create<VideoState>((set) => ({
  video: null,
  setVideo: (file) => set({ video: file }),
}));

type PhotoState = {
  photo: File | null;
  setPhoto: (file: File | null) => void;
};

export const usePhotoStore = create<PhotoState>((set) => ({
  photo: null,
  setPhoto: (file) => set({ photo: file }),
}));

type Location = { lat: number; lng: number };
type LocationState = {
  location: Location | null;
  setLocation: (location: Location | null) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));
