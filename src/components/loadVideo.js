/* eslint-disable no-param-reassign */
const loadVideo = async (videoRef) => {
  return new Promise((resolve) => {
    videoRef.current.onloadeddata = () => {
      resolve(videoRef.current);
    };
  });
};

export default loadVideo;
