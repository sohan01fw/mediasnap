import { useMutation } from "@tanstack/react-query";
import { savePost, uploadPhoto, uploadVideo } from "../services/mediaService";

export function useUploadVideo() {
  return useMutation({
    mutationFn: uploadVideo,
  });
}

export function useUploadPhoto() {
  return useMutation({
    mutationFn: uploadPhoto,
  });
}
export function useSavePost() {
  return useMutation({
    mutationFn: savePost,
  });
}
