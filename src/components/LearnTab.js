/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import loadModel from './loadModel';
import loadMedia from './loadMedia';
import detectPose from './detectPose';
import '../styles/camera.css';

const estimatePose = async (videoRef, canvasRef) => {
  Promise.all([loadModel(posenet, true), loadMedia(videoRef, false)]).then((values) => {
    const [model, video] = values;
    video.play();
    detectPose(model, video, canvasRef.current, false);
  });
};

const LearnTab = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    estimatePose(videoRef, canvasRef);
  }, [videoRef]);

  return (
    <div className="window">
      <video controls src="/videos/renegade.mp4" muted ref={videoRef} height="500" width="400" />
      <canvas className="canvas" ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default LearnTab;
