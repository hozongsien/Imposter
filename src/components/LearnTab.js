/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import loadModel from './loadModel';
import loadMedia from './loadMedia';
import detectPose from './detectPose';
import '../styles/camera.css';

const predict = async (videoRef, canvasRef) => {
  Promise.all([loadModel(posenet, 'low'), loadMedia(videoRef, false)]).then((values) => {
    const [model, video] = values;
    video.play();
    detectPose(model, video, canvasRef.current, false);
  });
};

const LearnTab = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    predict(videoRef, canvasRef);
  }, [videoRef, canvasRef]);

  return (
    <div className="window">
      <video src="/videos/renegade.mp4" muted ref={videoRef} height="400" width="300" />
      <canvas className="canvas" ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default LearnTab;