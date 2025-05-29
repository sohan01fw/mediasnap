// components/MediaPostForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdVideocam, MdPhotoLibrary, MdLocationPin } from "react-icons/md";
import {
  useLocationStore,
  usePhotoStore,
  useVideoStore,
} from "../lib/stores/useMediaStore";
import { Video } from "./Video";
import { Location, Map } from "./Location";
import { toast } from "sonner";
import { useUploadPhoto, useUploadVideo } from "../lib/hooks/useMedia";
import { supabase } from "../lib/supabase/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { savePost, type Post } from "../lib/services/mediaService";
import { Camera } from "./Photo";

const mediaSchema = z.object({
  content: z.string().optional(),
});

type MediaFormData = z.infer<typeof mediaSchema>;

export default function MediaPostForm() {
  const video = useVideoStore((s) => s.video);
  const photo = usePhotoStore((s) => s.photo);
  const location = useLocationStore((s) => s.location);
  const setVideo = useVideoStore((s) => s.setVideo);
  const setPhoto = usePhotoStore((s) => s.setPhoto);
  const setLocation = useLocationStore((s) => s.setLocation);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      content: "",
    },
  });

  const photoMutation = useUploadPhoto();
  const videoMutation = useUploadVideo();
  const mutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      toast.success("Posted successfully");
    },
  });
  const onSubmit = async ({ content }: MediaFormData) => {
    try {
      if (!content || !video || !photo || !location)
        return toast.error("Please fill all fields");
      let photoRes = null;
      let videoRes = null;

      if (photo) photoRes = await photoMutation.mutateAsync(photo);
      if (video) videoRes = await videoMutation.mutateAsync(video);

      const photoUrl = photoRes
        ? supabase.storage.from("photos").getPublicUrl(photoRes.path).data
            .publicUrl
        : null;
      const videoUrl = videoRes
        ? supabase.storage.from("videos").getPublicUrl(videoRes.path).data
            .publicUrl
        : null;

      const data: Post = {
        content: content || "",
        location: {
          lat: location?.lat || 0,
          lng: location?.lng || 0,
        },
        vid_url: videoUrl || "",
        pic_url: photoUrl || "",
      };
      mutation.mutate(data);
      reset();
      setVideo(null);
      setPhoto(null);
      setLocation(null);
    } catch (err) {
      console.error("Upload failed", err);
      toast("Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // <-- submit the form
      className="bg-base-100 p-6 rounded-lg shadow-lg space-y-4 flex justify-center

      "
    >
      <div className=" min-w-[20rem]  ">
        <div className="flex flex-col gap-4  ">
          {/* <img
            src={avatarUrl}
            className="w-10 h-10 rounded-full ring ring-primary"
          /> */}
          <div className="">
            <textarea
              {...register("content")}
              placeholder="What's on your mind?"
              className="textarea  flex-1 w-full resize-none border-transparent"
              rows={3}
            />
          </div>
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}

          {(video || photo || location) && (
            <div className="flex flex-row flex-wrap gap-2">
              {video && (
                <video
                  src={URL.createObjectURL(video)}
                  controls
                  width={300}
                  height={450}
                  className=" rounded "
                />
              )}
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  width={300}
                  height={330}
                  className=" rounded"
                />
              )}
              {location && <Map loc={location} />}
            </div>
          )}

          <div className="flex justify-between  mb-5">
            <div className="btn btn-sm btn-ghost flex items-center space-x-1">
              <MdVideocam className="w-5 h-5 text-red-500" />
              <span>
                <Video />
              </span>
            </div>
            <div className="btn btn-sm btn-ghost flex items-center space-x-1">
              <MdPhotoLibrary className="w-5 h-5 text-green-500" />
              <div className="z-100">
                <Camera />
              </div>
            </div>
            <div className="btn btn-sm btn-ghost flex items-center space-x-1">
              <MdLocationPin className="w-5 h-5 text-yellow-500" />
              <span>
                <Location />
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Post
        </button>
      </div>
    </form>
  );
}
