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

const startPredictions = (model, vidRef, canRef, stopDetectionRef, iRef) => {
  const poseDetectionFrame = async () => {
    // eslint-disable-next-line no-param-reassign
    stopDetectionRef.current = false;

    let poses = [];
    try {
      const pose = await model.estimatePoses(vidRef.current, {
        flipHorizontal: true,
        decodingMethod: 'single-person',
      });
      poses = poses.concat(pose);

      renderPredictions(poses, vidRef.current, canRef.current);
      if (stopDetectionRef.current === false) {
        const tempId = requestAnimationFrame(poseDetectionFrame);
        // eslint-disable-next-line no-param-reassign
        iRef.current = tempId;
      }
    } catch (e) {
      console.error(e);
    }
  };

  requestAnimationFrame(poseDetectionFrame);
};

const stopPredictions = (stopDetectionRef, iRef) => {
  if (iRef.current) {
    cancelAnimationFrame(iRef.current);
    // eslint-disable-next-line no-param-reassign
    stopDetectionRef.current = true;
  }
};

const PoseClassifierTab = (props) => {
  const { shouldDetect, isCamera, src } = props;
  const [assetLoaded, setAssetLoaded] = useState({
    model: undefined,
    media: undefined,
  });
  const videoRef = useRef();
  const canvasRef = useRef();
  const idRef = useRef();
  const stopDetection = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (!assetLoaded.model && !assetLoaded.media && shouldDetect) {
      Promise.all([loadModel(posenet, 'medium'), loadMedia(videoRef, isCamera)]).then((assets) => {
        setAssetLoaded({ model: assets[0], media: assets[1] });
      });
    }

    if (shouldDetect && assetLoaded.model && assetLoaded.media) {
      startPredictions(assetLoaded.model, videoRef, canvasRef, stopDetection, idRef);
    }

    if (!shouldDetect && assetLoaded.model && assetLoaded.media) {
      stopPredictions(stopDetection, idRef);
    }
  }, [assetLoaded, shouldDetect]);

  return (
    <div className={classes.root}>
      <video
        className={classes.video}
        src={isCamera ? '' : src}
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
  isCamera: PropTypes.bool,
  src: PropTypes.any,
};

PoseClassifierTab.defaultProps = {
  shouldDetect: PropTypes.bool.true,
  isCamera: PropTypes.bool.false,
  src: PropTypes.string,
};

export default PoseClassifierTab;
