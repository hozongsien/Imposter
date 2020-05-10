/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import { makeStyles } from '@material-ui/core/styles';
import loadModel from './loadModel';
import loadMedia from './loadMedia';
import detectPose from './detectPose';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
  },
  video: {
    objectFit: 'initial',
    position: 'relative',
    height: '100%',
    // width: '100%', // Remove for horizontal videos
  },
  canvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'block',
  },
}));

const predict = async (videoRef, canvasRef) => {
  Promise.all([loadModel(posenet, 'low'), loadMedia(videoRef, false)]).then((values) => {
    const [model, video] = values;
    video.play();
    detectPose(model, video, canvasRef.current, true);
  });
};

const LearnTab = () => {
  const classes = useStyles();
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    predict(videoRef, canvasRef);
  }, [videoRef, canvasRef]);

  return (
    <div className={classes.root}>
      <video
        className={classes.video}
        src="/videos/renegade.mp4"
        muted
        ref={videoRef}
        width="1080"
        height="720"
      />
      <canvas className={classes.canvas} ref={canvasRef} />
    </div>
  );
};

export default LearnTab;
