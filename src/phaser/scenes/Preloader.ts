import { enums } from "@colobobo/library";
import * as config from "../../config";
import { platformsTexture } from "../../config/platforms";
import { getTrapsTexture } from "../../config/traps";

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
    Object.values(enums.World).forEach(world => {
      // load wall
      this.load.svg(config.worlds[world].platforms.wall);
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
  }

  preload() {
    this.load.on("progress", (value: any) => {
      // console.log("load progress : " + value);
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
    this.scene.start("main-scene");
  }
}
