import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { usePhotoStore } from "../lib/stores/useMediaStore";

export const Camera = () => {
  const setPhoto = usePhotoStore((s) => s.setPhoto);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [openCamera, setOpenCamera] = useState(false);

  const capture = () => {
    const imgSrc = webcamRef.current?.getScreenshot();
    if (!imgSrc) return;

    // convert base64 → Blob → File
    const byteString = atob(imgSrc.split(",")[1]);
    const buf = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      buf[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([buf], { type: "image/jpeg" });
    if (blob.size > 10 * 1024 * 1024) {
      setError("Image must be ≤10MB");
      return;
    }

    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
    setError(null);
    setPhoto(file);
  };

  return (
    <>
      {!openCamera ? (
        <button onClick={() => setOpenCamera(true)} className="cursor-pointer">
          Open Camera
        </button>
      ) : (
        <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={() => {
              capture();
              setOpenCamera(false);
            }}
            className="hover:cursor-pointer btn btn-secondary"
          >
            Capture Photo
          </button>
        </>
      )}
    </>
  );
};
