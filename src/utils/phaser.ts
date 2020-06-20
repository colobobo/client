const getGameWrapConfig = (width: number, height: number) => ({
  min: {
    x: 0,
    y: 0
  },
  max: {
    x: width,
    y: height
  }
});

export default {
  getGameWrapConfig
};
