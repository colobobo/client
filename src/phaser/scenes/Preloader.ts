import { platformsTexture } from "../../config/platforms";
import { trapsTexture } from "../../config/traps";
import { wallsShapes, wallsTexture } from "../../config/walls";
import { membersShapes, membersTexture } from "../../config/members";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "preloader" });
  }

  loadMembers() {
    this.load.multiatlas({
      key: membersTexture,
      atlasURL: `assets/spritesheets/members/atlas.json`,
      path: `assets/spritesheets/members/`
    });
  }

  loadWalls() {
    this.load.multiatlas({
      key: wallsTexture,
      atlasURL: `assets/spritesheets/walls/atlas.json`,
      path: `assets/spritesheets/walls/`
    });
  }

  loadPlatforms() {
    this.load.multiatlas({
      key: platformsTexture,
      atlasURL: "assets/spritesheets/platforms/atlas.json",
      path: "assets/spritesheets/platforms/"
    });
  }

  loadTraps() {
    this.load.multiatlas({
      key: trapsTexture,
      atlasURL: `assets/spritesheets/traps/atlas.json`,
      path: `assets/spritesheets/traps/`
    });
  }

  loadShapes() {
    this.load.json("shapes", "assets/shapes/shapes.json");
    this.load.json(wallsShapes, "assets/shapes/walls/shapes.json");
    this.load.json(membersShapes, "assets/shapes/members/shapes.json");
  }

  preload() {
    this.load.on("progress", (value: string) => {
      console.log(`load progress : ${Math.round(Number(value) * 100)}%`);
    });
    this.load.on("complete", () => {
      console.log("LOAD COMPLETE");
    });

    this.loadMembers();
    this.loadPlatforms();
    this.loadWalls();
    this.loadShapes();
    this.loadTraps();
  }

  create() {
    const maxTextures = (this.game
      .renderer as Phaser.Renderer.WebGL.WebGLRenderer).getMaxTextures();
    const maxTextureSize = (this.game
      .renderer as Phaser.Renderer.WebGL.WebGLRenderer).getMaxTextureSize();
    console.log({ maxTextures, maxTextureSize });
    this.scene.start("main-scene");
  }
}
