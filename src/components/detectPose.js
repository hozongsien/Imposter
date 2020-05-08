/* global requestAnimationFrame */
import renderPredictions from './renderPredictions';

const detectPose = (net, video, canvas, drawPrediction, shouldDetect) => {
  const poseDetectionFrame = async () => {
    let poses = [];
    const pose = await net.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: 'single-person',
    });
    poses = poses.concat(pose);

    renderPredictions(poses, video, canvas);
    requestAnimationFrame(poseDetectionFrame);
  };

  poseDetectionFrame();
};

export default detectPose;
