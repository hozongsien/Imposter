const loadModel = async (model, accuracy) => {
  let net;

  switch (accuracy) {
    case 'low':
      net = await model.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 513, height: 200 },
        multiplier: 0.5,
        quantBytes: 2,
      });
      break;
    case 'medium':
      net = await model.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 513, height: 200 },
        multiplier: 0.75,
        quantBytes: 2,
      });
      break;
    case 'high':
      net = await model.load({
        architecture: 'MobileNetV1',
        outputStride: 8,
        inputResolution: { width: 513, height: 200 },
        multiplier: 1,
        quantBytes: 4,
      });
      break;
    case 'ultra':
      net = await model.load({
        architecture: 'ResNet50',
        outputStride: 16,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 4,
      });
      break;
    default:
      net = await model.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 513, height: 200 },
        multiplier: 0.5,
        quantBytes: 2,
      });
  }

  return net;
};

export default loadModel;
