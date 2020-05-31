import Phaser from "phaser";

const getGameWrapConfig = (game: Phaser.Game) => ({
  min: {
    x: 0,
    y: 0
  },
  max: {
    x: game.canvas.width,
    y: game.canvas.height
  }
});

export default {
  getGameWrapConfig
};
