/* eslint-disable no-param-reassign */
/* global navigator */
const loadCamera = async (videoRef) => {
  const isMobile = true;

  const videoConstraints = {
    facingMode: 'user',
    width: isMobile ? undefined : videoRef.videoWidth,
    height: isMobile ? undefined : videoRef.videoHeight,
    aspectRatio: { ideal: 0.5625 },
  };

  const constraints = {
    audio: false,
    video: videoConstraints,
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoRef.current.srcObject = stream;

  return new Promise((resolve) => {
    videoRef.current.onloadedmetadata = () => {
      resolve(videoRef.current);
    };
  });
};

export default loadCamera;
