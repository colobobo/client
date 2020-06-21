import { enums } from "@colobobo/library";
import * as config from "../../config";
import { platformsTexture } from "../../config/platforms";
import { getTrapsTexture } from "../../config/traps";
import { wallsShapes, wallsTexture } from "../../config/walls";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "preloader" });
  }

  loadMembers() {
    Object.values(enums.member.Skins).forEach(memberSkin => {
      // load skins texture
      this.load.svg(config.members[memberSkin].skin);
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
    Object.values(enums.World).forEach(world => {
      this.load.multiatlas({
        key: getTrapsTexture(world),
        atlasURL: `assets/spritesheets/traps/${world}/atlas.json`,
        path: `assets/spritesheets/traps/${world}/`
      });
    });
  }

  loadShapes() {
    this.load.json("shapes", "assets/shapes/shapes.json");
    this.load.json(wallsShapes, "assets/shapes/walls/shapes.json");
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
