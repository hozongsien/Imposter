import React, { useRef, useState, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import { makeStyles } from '@material-ui/core/styles';
import loadMedia from './loadMedia';
import loadModel from './loadModel';
import detectPose from './detectPose';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  video: {
    objectFit: 'initial',
    position: 'relative',
    // width: '100%',
    height: '100%',
    display: 'block',
  },
  canvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'block',
  },
}));

const PoseClassifierTab = (props) => {
  const { shouldDetect } = props;
  const videoRef = useRef();
  const canvasRef = useRef();
  const classes = useStyles();

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
    <div className={classes.root}>
      <video
        className={classes.video}
        autoPlay
        playsInline
        muted
        ref={videoRef}
        height="720"
        width="405"
      />
      <canvas className={classes.canvas} ref={canvasRef} />
    </div>
  );
};

export default PoseClassifierTab;
