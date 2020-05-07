const loadModel = async (model, isMobile) => {
  let net;
  if (isMobile) {
    net = await model.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: { width: 513, height: 200 },
      multiplier: 0.5,
      quantBytes: 2,
    });
  } else {
    net = await model.load({
      architecture: 'ResNet50',
      outputStride: 32,
      inputResolution: { width: 257, height: 200 },
      quantBytes: 2,
    });
  }

  return net;
};

export default loadModel;
