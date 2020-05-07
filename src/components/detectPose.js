import { drawSkeleton, drawKeypoints, drawBoundingBox } from './renderPredictions';

const detectPose = (net, video, canvas) => {
  const ctx = canvas.getContext('2d');
  const videoWidth = video.width;
  const videoHeight = video.height;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  console.log('video', video.width, video.height);
  console.log('canvas', canvas.width, canvas.height);

  async function poseDetectionFrame() {
    let poses = [];
    let minPoseConfidence = 0.1;
    let minPartConfidence = 0.15;

    const pose = await net.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: 'single-person',
    });
    poses = poses.concat(pose);

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores
    poses.forEach(({ score, keypoints }) => {
      if (score >= minPoseConfidence) {
        drawKeypoints(keypoints, minPartConfidence, ctx);
        drawSkeleton(keypoints, minPartConfidence, ctx);
        // drawBoundingBox(keypoints, ctx);
      }
    });

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
};

export default detectPose;
