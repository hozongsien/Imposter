/* eslint-disable no-param-reassign */
import * as posenet from '@tensorflow-models/posenet';

const toTuple = ({ y, x }) => {
  return [y, x];
};

const drawPoint = (ctx, y, x, r, color) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

/**
 * Draws a line on a canvas, i.e. a joint
 */
const drawSegment = ([ay, ax], [by, bx], color, scale, ctx) => {
  const lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
};

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
const drawSkeleton = (keypoints, minConfidence, ctx, scale = 1) => {
  const color = 'aqua';

  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach((points) => {
    drawSegment(toTuple(points[0].position), toTuple(points[1].position), color, scale, ctx);
  });
};

/**
 * Draw pose keypoints onto a canvas
 */
const drawKeypoints = (keypoints, minConfidence, ctx, scale = 1) => {
  const color = 'aqua';

  for (let i = 0; i < keypoints.length; i += 1) {
    const keypoint = keypoints[i];

    if (keypoint.score >= minConfidence) {
      const { y, x } = keypoint.position;
      drawPoint(ctx, y * scale, x * scale, 3, color);
    }
  }
};

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
const drawBoundingBox = (keypoints, ctx) => {
  const boundingBoxColor = 'red';

  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.strokeRect(
    boundingBox.minX,
    boundingBox.minY,
    boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY
  );

  ctx.strokeStyle = boundingBoxColor;
  ctx.stroke();
};

const renderPredictions = (predictions, video, canvas) => {
  canvas.width = video.width;
  canvas.height = video.height;

  const minPoseConfidence = 0.1;
  const minPartConfidence = 0.15;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, video.width, video.height);
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-video.width, 0);
  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore();

  // For each pose (i.e. person) detected in an image, loop through the poses
  // and draw the resulting skeleton and keypoints if over certain confidence
  // scores
  predictions.forEach(({ score, keypoints }) => {
    if (score >= minPoseConfidence) {
      drawKeypoints(keypoints, minPartConfidence, ctx);
      drawSkeleton(keypoints, minPartConfidence, ctx);
      // drawBoundingBox(keypoints, ctx);
    }
  });
};

export default renderPredictions;
