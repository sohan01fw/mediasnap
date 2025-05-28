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
  content: z.string().min(1, "Enter something").max(280).optional(),
});

type MediaFormData = z.infer<typeof mediaSchema>;

export default function MediaPostForm({ avatarUrl }: { avatarUrl: string }) {
  const video = useVideoStore((s) => s.video);
  const photo = usePhotoStore((s) => s.photo);
  const location = useLocationStore((s) => s.location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
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
      const [photoRes, videoRes] = await Promise.all([
        photo ? photoMutation.mutateAsync(photo) : Promise.resolve(null),
        video ? videoMutation.mutateAsync(video) : Promise.resolve(null),
      ]);

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
    } catch (err) {
      console.error("Upload failed", err);
      toast("Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // <-- submit the form
      className="bg-base-100 p-6 rounded-lg shadow-lg space-y-4"
    >
      <div className="flex items-start space-x-3">
        <img
          src={avatarUrl}
          className="w-10 h-10 rounded-full ring ring-primary"
        />
        <textarea
          {...register("content")}
          placeholder="What's on your mind?"
          className="textarea textarea-bordered flex-1 resize-none"
          rows={3}
        />
      </div>
      {errors.content && (
        <p className="text-sm text-red-500">{errors.content.message}</p>
      )}

      {(video || photo) && (
        <div className="space-y-2">
          {video && (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full rounded"
            />
          )}
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt=""
              className="w-full rounded"
            />
          )}
          {location && <Map loc={location} />}
        </div>
      )}

      <div className="flex justify-between">
        <div className="btn btn-sm btn-ghost flex items-center space-x-1">
          <MdVideocam className="w-5 h-5 text-red-500" />
          <span>
            <Video />
          </span>
        </div>
        <div className="btn btn-sm btn-ghost flex items-center space-x-1">
          <MdPhotoLibrary className="w-5 h-5 text-green-500" />
          <span>
            <Camera />
          </span>
        </div>
        <div className="btn btn-sm btn-ghost flex items-center space-x-1">
          <MdLocationPin className="w-5 h-5 text-yellow-500" />
          <span>
            <Location />
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <progress className="progress progress-info w-full"></progress>
        ) : (
          "Post"
        )}
      </button>
    </form>
  );
}
