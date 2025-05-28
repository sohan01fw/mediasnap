import { useState } from "react";
import { useVideoStore } from "../lib/stores/useMediaStore";

export const Video = () => {
  const setVideo = useVideoStore((s) => s.setVideo);
  const [error, setError] = useState<string | null>(null);
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 10 * 1024 * 1024) {
      setError("Image must be ≤10MB");
      return;
    }
    if (file) {
      setVideo(file);
    }
  };
  return (
    <div>
      <label className="cursor-pointer">
        Upload Video
        <input
          type="file"
          accept="video/mp4"
          onChange={handleVideoChange}
          className="hidden"
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
