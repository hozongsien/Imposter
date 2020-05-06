const loadCamera = async (videoRef) => {
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
    };
  });
};

const loadVideo = async (videoRef) => {
  const video = await loadCamera(videoRef);
  video.play();

  return video;
};

export default loadVideo;
