import React, { useRef, useState, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import loadMedia from './loadMedia';
import loadModel from './loadModel';
import detectPose from './detectPose';
import '../styles/camera.css';

const PoseClassifierTab = (props) => {
  const { shouldDetect } = props;
  const videoRef = useRef();
  const canvasRef = useRef();

  const predict = async (videoRef, canvasRef) => {
    Promise.all([loadModel(posenet, 'medium'), loadMedia(videoRef, true)]).then((values) =>
      detectPose(values[0], values[1], canvasRef.current, true, true)
    );
  };

  const startPredictions = () => {
    console.log('Start Predictions');
    predict(videoRef, canvasRef);
  };

  const stopPredictions = () => {
    console.log('Stop Predictions');
  };

  useEffect(() => {
    if (shouldDetect) {
      const id = startPredictions();
    } else {
      stopPredictions();
    }
  }, [videoRef, canvasRef]);

  return (
    <div className="window">
      <video className="video" autoPlay playsInline muted ref={videoRef} height="400" width="300" />
      <canvas className="canvas" ref={canvasRef} />
    </div>
  );
};

export default PoseClassifierTab;
