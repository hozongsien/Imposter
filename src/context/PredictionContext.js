import { createContext } from 'react';

const PredictionContext = createContext({
  shouldDetect: { videoTab: false, cameraTab: false },
  configDetection: () => {},
});

export default PredictionContext;
