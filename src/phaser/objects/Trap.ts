import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import Member from "./Member";
import { actions } from "../../redux";
import { TrapsAnimationConfig } from "../../config/traps";

export default class Trap extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  scene: MainScene;
  areaHeightRatio: number;
  animationConfig: TrapsAnimationConfig;
  animationRepeatDelay: number;
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig;

  constructor({
    scene,
    x = 0,
    y = 0,
    frame,
    options,
    areaHeightRatio = 1,
    pixelRatio,
    animationConfig,
    animationRepeatDelay = 0
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    frame?: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    areaHeightRatio?: number;
    pixelRatio: number;
    animationConfig: TrapsAnimationConfig;
    animationRepeatDelay?: number;
  }) {
    super(scene.matter.world, x, y, animationConfig.texture, frame, options);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;
    this.options = options;
    this.areaHeightRatio = areaHeightRatio;
    this.pixelRatio = pixelRatio;
    this.animationConfig = animationConfig;
    this.animationRepeatDelay = animationRepeatDelay;
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

    // animation
    this.createAnimation();
    this.addAnimationEventListener();
    this.play(this.animationConfig.animationKey);

    this.addCollisionListener();
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
      repeatDelay: this.animationRepeatDelay,
      frameRate: 25
    });
  }

  addAnimationEventListener() {
    this.on(
      "animationupdate",
      (
        currentAnim: Phaser.Animations.Animation,
        currentFrame: Phaser.Animations.AnimationFrame,
        sprite: Phaser.GameObjects.Sprite
      ) => {
        const textureFrame = currentFrame.textureFrame as string;
        const textureFrameParts = textureFrame.split("/");
        const frameId = textureFrameParts[textureFrameParts.length - 1];
        const shapes = this.scene.cache.json.get(
          this.animationConfig.shapes.key
        );
        const frameShape = shapes[frameId];
        if (frameShape) {
          this.setBodyWithShape(frameShape);
        }
      }
    );
  }

  setBodyWithShape(shape: any) {
    const sScale = this.scale;
    const sCenter = this.getCenter();

    this.setScale(1);
    this.setBody(shape, this.options);
    this.setScale(sScale);

    // re align center
    this.setX(this.x + sCenter.x - this.getCenter().x);
    this.setY(this.y + sCenter.y - this.getCenter().y);
  }

  // COLLLISION

  addCollisionListener() {
    this.scene.matterCollision.addOnCollideStart({
      objectA: this,
      callback: (e: any) => {
        const { gameObjectB } = e;
        console.log("trap : collision start");
        // if collide with member
        if (gameObjectB instanceof Member) {
          const roundMember = this.scene.game.roundMembersArray.find(
            member => member.id === gameObjectB.id
          );
          // if i'm the player manager
          if (this.scene.game.playerId === roundMember?.manager) {
            // emit member trapped

            this.scene.game.dispatch(
              actions.webSocket.emit.round.memberTrapped({
                memberId: gameObjectB.id
              })
            );
          }
        }
      }
    });
  }
}
