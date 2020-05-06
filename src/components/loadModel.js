const loadModel = async (model) => {
  const net = await model.load({
    architecture: "ResNet50",
    outputStride: 32,
    inputResolution: { width: 257, height: 200 },
    quantBytes: 2,
  });

  return net;
};

export default loadModel;
