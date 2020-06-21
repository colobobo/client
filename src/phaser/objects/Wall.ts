import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import { WallsAnimationConfig, wallsShapes } from "../../config/walls";

export default class Wall extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  scene: MainScene;
  collisionEnabled: boolean;
  areaHeightRatio: number;
  animationConfig: WallsAnimationConfig;
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig;

  constructor({
    scene,
    x = 0,
    y = 0,
    options,
    collisionEnabled = true,
    areaHeightRatio = 1,
    pixelRatio,
    animationConfig
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    collisionEnabled?: boolean;
    areaHeightRatio?: number;
    pixelRatio: number;
    animationConfig: WallsAnimationConfig;
  }) {
    const firstFrame = scene.anims.generateFrameNames(animationConfig.texture, {
      prefix: animationConfig.prefix,
      start: animationConfig.startFrame,
      end: animationConfig.endFrame,
      zeroPad: 5
    })[0]?.frame as string;

    super(
      scene.matter.world,
      x,
      y,
      animationConfig.texture,
      firstFrame,
      options
    );

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;
    this.collisionEnabled = collisionEnabled;
    this.options = options;
    this.areaHeightRatio = areaHeightRatio;
    this.pixelRatio = pixelRatio;
    this.animationConfig = animationConfig;
    this.init();
  }

  // FUNCTIONS

  init() {
    // set scale with areaHeightRatio (default 100%)
    this.setScale(
      ((this.scene.game.areaHeight * this.areaHeightRatio) / this.height) *
        this.pixelRatio
    );

    // vertical center
    this.setY(this.scene.game.canvas.height / 2);

    this.setBodyWithShape();

    // animation
    this.createAnimation();

    this.play(this.animationConfig.animationKey);
  }

  setBodyWithShape() {
    const sScale = this.scale;
    const shapes = this.scene.cache.json.get(wallsShapes);
    const sCenter = this.getCenter();

    this.setScale(1);
    this.setBody(shapes[this.scene.game.world], this.options);
    this.setScale(sScale);

    // re align center
    this.setX(this.x + sCenter.x - this.getCenter().x);
    this.setY(this.y + sCenter.y - this.getCenter().y);
  }

  // ANIMATION

  createAnimation() {
    this.scene.anims.create({
      key: this.animationConfig.animationKey,
      frames: this.scene.anims.generateFrameNames(this.texture.key, {
        prefix: this.animationConfig.prefix,
        start: this.animationConfig.startFrame,
        end: this.animationConfig.endFrame,
        zeroPad: 5
      }),
      repeat: -1,
      frameRate: 25
    });
  }
}
