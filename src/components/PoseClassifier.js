import React, { useRef } from "react";
import useCamera from "./useCamera";
import * as posenet from "@tensorflow-models/posenet";

const PoseClassifier = () => {
  const videoRef = useRef();

  const cameraLoaded = useCamera(videoRef, true);

  return (
    <div>
      <video
        className="video"
        autoPlay
        playsInline
        muted
        ref={videoRef}
        height="250"
        width="150"
      />
    </div>
  );
};

export default PoseClassifier;
