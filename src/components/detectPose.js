/* global requestAnimationFrame */
import renderPredictions from './renderPredictions';

const detectPose = (net, video, canvas, drawPrediction) => {
  const poseDetectionFrame = async () => {
    let poses = [];
    const pose = await net.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: 'single-person',
    });
    poses = poses.concat(pose);

    if (drawPrediction) {
      renderPredictions(poses, video, canvas);
      requestAnimationFrame(poseDetectionFrame);
    }
  };

  poseDetectionFrame();
};

export default detectPose;
