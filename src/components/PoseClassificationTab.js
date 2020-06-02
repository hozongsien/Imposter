/* global requestAnimationFrame cancelAnimationFrame */
import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import * as posenet from '@tensorflow-models/posenet';
import { makeStyles } from '@material-ui/core/styles';
import loadVideo from './loadVideo';
import loadCamera from './loadCamera';
import loadModel from './loadModel';
import renderPredictions from './renderPredictions';
import PredictionContext from '../context/PredictionContext';

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
  const { src } = props;
  const [assetLoaded, setAssetLoaded] = useState({
    model: null,
    media: null,
  });
  const mediaRef = useRef();
  const canvasRef = useRef();
  const idRef = useRef();
  const stopDetection = useRef();
  const classes = useStyles();

  const predContext = useContext(PredictionContext);

  const mountMedia = async () => {
    let loadMedia;
    if (src) {
      loadMedia = loadVideo;
    } else {
      loadMedia = loadCamera;
    }

    const [model, media] = await Promise.all([loadModel(posenet, 'medium'), loadMedia(mediaRef)]);
    setAssetLoaded({ model, media });
  };

  const unmountMedia = () => {
    if (!src) {
      mediaRef.current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  // mount & unmount
  useEffect(() => {
    mountMedia();

    return () => {
      stopPredictions(stopDetection, idRef);
      unmountMedia();
    };
  }, []);

  // toggle detection
  useEffect(() => {
    if (
      assetLoaded.model &&
      assetLoaded.media &&
      (predContext.shouldDetect.videoTab || predContext.shouldDetect.cameraTab)
    ) {
      startPredictions(assetLoaded.model, mediaRef, canvasRef, stopDetection, idRef);
    }

    if (
      assetLoaded.model &&
      assetLoaded.media &&
      !(predContext.shouldDetect.videoTab || predContext.shouldDetect.cameraTab)
    ) {
      stopPredictions(stopDetection, idRef);
    }
  }, [assetLoaded, predContext.shouldDetect]);

  return (
    <div className={classes.root}>
      <video
        className={classes.video}
        src={src}
        autoPlay
        playsInline
        muted
        ref={mediaRef}
        height="720"
        width="405"
      />
      <canvas className={classes.canvas} ref={canvasRef} />
    </div>
  );
};

PoseClassifierTab.propTypes = {
  src: PropTypes.string,
};

PoseClassifierTab.defaultProps = {
  src: null,
};

export default PoseClassifierTab;
