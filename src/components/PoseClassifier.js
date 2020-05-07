import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import loadMedia from './loadMedia';
import loadModel from './loadModel';
import detectPose from './detectPose';
import '../styles/camera.css';

const estimatePose = async (videoRef, canvasRef) => {
  Promise.all([loadModel(posenet, true), loadMedia(videoRef, true)]).then((values) =>
    detectPose(values[0], values[1], canvasRef.current, true)
  );
};

const PoseClassifier = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    estimatePose(videoRef, canvasRef);
  }, [videoRef]);

  return (
    <div className="window">
      <video className="video" autoPlay playsInline muted ref={videoRef} height="500" width="400" />
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};

export default PoseClassifier;
