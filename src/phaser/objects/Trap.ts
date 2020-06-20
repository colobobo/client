import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import Member from "./Member";
import { actions } from "../../redux";
import { TrapsAnimationConfig } from "../../config/traps";

export default class Trap extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  scene: MainScene;
  collisionEnabled: boolean;
  areaHeightRatio: number;
  animationConfig: TrapsAnimationConfig;
  animationRepeatDelay: number;

  constructor({
    scene,
    x = 0,
    y = 0,
    options,
    collisionEnabled = true,
    areaHeightRatio = 1,
    pixelRatio,
    animationConfig,
    animationRepeatDelay = 0
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    collisionEnabled?: boolean;
    areaHeightRatio?: number;
    pixelRatio: number;
    animationConfig: TrapsAnimationConfig;
    animationRepeatDelay?: number;
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
    // this.animationKey = animationKey;
    this.collisionEnabled = collisionEnabled;
    // this.location = location;
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
    this.play(this.animationConfig.animationKey);

    // collision
    if (this.collisionEnabled) {
      this.addCollisionListener();
    } else {
      this.setCollidesWith(0);
    }
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
