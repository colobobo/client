import * as Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

export const getGameConfig = ({
  areaWidth,
  areaHeight,
  parent,
  scene
}: {
  areaWidth: number;
  areaHeight: number;
  parent: Phaser.Types.Core.GameConfig["parent"];
  scene: Phaser.Types.Core.GameConfig["scene"];
}): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  width: areaWidth,
  height: areaHeight,
  parent: parent,
  transparent: true,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 1 },
      debug:
        process.env.NODE_ENV === "development"
          ? {
              showBody: true,
              showStaticBody: true,
              showInternalEdges: true,
              showVelocity: true,
              showCollisions: true,
              lineThickness: 2,
              showPositions: true,
              positionSize: 6
            }
          : false,
      setBounds: {
        x: -150,
        left: false,
        right: false,
        width: areaWidth + 150,
        thickness: 30
      },
      "plugins.wrap": true
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision",
        mapping: "matterCollision"
      }
    ]
  },
  scene
});
