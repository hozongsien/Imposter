import { useEffect, useState } from "react";

const useCamera = (videoRef, isFrontCamera) => {
  const [cameraLoaded, setCameraLoaded] = useState();

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  const getMedia = async () => {
    const isMobile = true;
    let videoConstraints = {
      facingMode: "user",
      width: isMobile ? undefined : videoRef.videoWidth,
      height: isMobile ? undefined : videoRef.videoHeight,
      aspectRatio: { ideal: 0.5625 },
    };

    const constraints = {
      audio: false,
      video: videoConstraints,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(videoRef);
    videoRef.current.srcObject = stream;

    return new Promise((resolve) => {
      videoRef.current.onloadedmetadata = () => {
        resolve(videoRef.current);
        setCameraLoaded(videoRef.current);
      };
    });
  };

  const loadVideo = async () => {
    const video = await getMedia();
    video.play();

    return video;
  };

  useEffect(() => {
    try {
      loadVideo();
    } catch (e) {
      console.log(e);
    }
  });

  return cameraLoaded;
};

export default useCamera;
