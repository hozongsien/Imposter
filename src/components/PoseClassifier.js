import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import loadVideo from './loadVideo';
import loadModel from './loadModel';
import detectPose from './detectPose';
import '../styles/camera.css';

const estimatePose = async (videoRef, canvasRef) => {
  Promise.all([loadModel(posenet), loadVideo(videoRef)]).then((values) =>
    detectPose(values[0], values[1], canvasRef.current)
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
      <video className="video" autoPlay playsInline muted ref={videoRef} height="250" width="150" />
      <canvas className="canvas" ref={canvasRef} height="250" width="150" />
    </div>
  );
};

export default PoseClassifier;
