/* eslint-disable jsx-a11y/media-has-caption */
/* global requestAnimationFrame cancelAnimationFrame */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as posenet from '@tensorflow-models/posenet';
import { makeStyles } from '@material-ui/core/styles';
import loadModel from './loadModel';
import loadMedia from './loadMedia';
import renderPredictions from './renderPredictions';

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

const LearnTab = (props) => {
  const { shouldDetect } = props;
  const [assetLoaded, setAssetLoaded] = useState({
    model: undefined,
    media: undefined,
  });

  const videoRef = useRef();
  const canvasRef = useRef();
  const idRef = useRef();
  const stopDetection = useRef();
  const classes = useStyles();

  const stopPredictions = () => {
    if (idRef.current) {
      cancelAnimationFrame(idRef.current);
      stopDetection.current = true;
    }
  };

  const poseDetectionFrame = async () => {
    stopDetection.current = false;

    let poses = [];

    try {
      const pose = await assetLoaded.model.estimatePoses(videoRef.current, {
        flipHorizontal: true,
        decodingMethod: 'single-person',
      });
      poses = poses.concat(pose);

      renderPredictions(poses, videoRef.current, canvasRef.current);
      if (stopDetection.current === false) {
        const tempId = requestAnimationFrame(poseDetectionFrame);
        idRef.current = tempId;
      }
    } catch (e) {
      stopPredictions();
    }
  };

  const startPredictions = () => {
    requestAnimationFrame(poseDetectionFrame);
  };

  useEffect(() => {
    if (!assetLoaded.model && !assetLoaded.camera && shouldDetect) {
      Promise.all([loadModel(posenet, 'low'), loadMedia(videoRef, false)]).then((assets) => {
        setAssetLoaded({ model: assets[0], media: assets[1] });
      });
    }

    if (shouldDetect && assetLoaded.model && assetLoaded.media) {
      startPredictions();
      assetLoaded.media.play();
    }

    if (!shouldDetect && assetLoaded.model && assetLoaded.media) {
      stopPredictions();
    }
  }, [assetLoaded, shouldDetect]);

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

LearnTab.propTypes = {
  shouldDetect: PropTypes.bool,
};

LearnTab.defaultProps = {
  shouldDetect: PropTypes.bool.true,
};

export default LearnTab;
