/* global requestAnimationFrame cancelAnimationFrame */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as posenet from '@tensorflow-models/posenet';
import { makeStyles } from '@material-ui/core/styles';
import loadMedia from './loadMedia';
import loadModel from './loadModel';
import renderPredictions from './renderPredictions';

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
  const [assetLoaded, setAssetLoaded] = useState({
    model: undefined,
    camera: undefined,
  });
  const videoRef = useRef();
  const canvasRef = useRef();
  const idRef = useRef();
  const stopDetection = useRef();
  const classes = useStyles();

  const poseDetectionFrame = async () => {
    stopDetection.current = false;

    let poses = [];
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
  };

  const startPredictions = () => {
    requestAnimationFrame(poseDetectionFrame);
  };

  const stopPredictions = () => {
    if (idRef.current) {
      cancelAnimationFrame(idRef.current);
      stopDetection.current = true;
    }
  };

  useEffect(() => {
    if (!assetLoaded.model && !assetLoaded.camera && shouldDetect) {
      Promise.all([loadModel(posenet, 'medium'), loadMedia(videoRef, true)]).then((assets) => {
        setAssetLoaded({ model: assets[0], camera: assets[1] });
      });
    }

    if (shouldDetect && assetLoaded.model && assetLoaded.camera) {
      startPredictions();
    } else if (!shouldDetect && assetLoaded.model && assetLoaded.camera) {
      stopPredictions();
    } else {
      console.log('idle....');
    }
  }, [assetLoaded, shouldDetect]);

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

PoseClassifierTab.propTypes = {
  shouldDetect: PropTypes.bool,
};

PoseClassifierTab.defaultProps = {
  shouldDetect: PropTypes.bool.true,
};

export default PoseClassifierTab;
