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

const loadVideo = async (videoRef) => {
  return new Promise((resolve) => {
    videoRef.current.onloadeddata = () => {
      resolve(videoRef.current);
    };
  });
};

const loadMedia = async (videoRef, isCamera) => {
  let media;
  if (isCamera) {
    media = await loadCamera(videoRef);
    return media;
  }

  media = await loadVideo(videoRef);
  return media;
};

export default loadMedia;
