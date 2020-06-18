import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import Member from "./Member";
import { actions } from "../../redux";

export enum TrapLocation {
  top = "top",
  bottom = "bottom"
}

export default class Trap extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  scene: MainScene;
  readonly animationKey: string;
  collisionEnabled: boolean;
  location: TrapLocation;
  areaHeightRatio: number;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    frame,
    options,
    animationKey,
    collisionEnabled = true,
    location = TrapLocation.top,
    areaHeightRatio = 0.5,
    pixelRatio
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    texture: string;
    frame?: string;
    animationKey: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    collisionEnabled?: boolean;
    location?: TrapLocation;
    areaHeightRatio?: number;
    pixelRatio: number;
  }) {
    // TODO: wip
    const firstFrame =
      frame ||
      (scene.anims.generateFrameNames(texture, {
        prefix: "worlds/desert/trap/snake/",
        start: 19,
        end: 144,
        zeroPad: 5
      })[0]?.frame as string);

    super(scene.matter.world, x, y, texture, firstFrame, options);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;
    this.animationKey = animationKey;
    this.collisionEnabled = collisionEnabled;
    this.location = location;
    this.areaHeightRatio = areaHeightRatio;
    this.pixelRatio = pixelRatio;
    this.init();
  }

  // FUNCTIONS

  init() {
    // set scale with areaHeightRatio
    this.setScale(
      ((this.scene.areaHeight * this.areaHeightRatio) / this.height) *
        this.pixelRatio
    );

    if (this.location === TrapLocation.top) {
      this.setY(this.y + this.displayHeight / 2);
    } else if (this.location === TrapLocation.bottom) {
      this.setY(this.scene.game.canvas.height - this.displayHeight / 2);
    }

    this.createAnimation();
    this.play(this.animationKey);

    if (this.collisionEnabled) {
      this.addCollisionListener();
    } else {
      this.setCollidesWith(0);
    }
  }

  // wip
  // TODO: create animation from dynamicaly
  createAnimation() {
    this.scene.anims.create({
      key: this.animationKey,
      frames: this.scene.anims.generateFrameNames(this.texture.key, {
        prefix: "worlds/desert/trap/snake/",
        start: 19,
        end: 144,
        zeroPad: 5
      }),
      repeat: -1,
      frameRate: 30
    });
  }

  addCollisionListener() {
    this.scene.matterCollision.addOnCollideStart({
      objectA: this,
      callback: (e: any) => {
        const { gameObjectB } = e;
        console.log("trap : collision start");
        // if collide with member
        if (gameObjectB instanceof Member) {
          const roundMember = this.scene.roundMembersArray.find(
            member => member.id === gameObjectB.id
          );
          // if i'm the player manager
          if (this.scene.playerId === roundMember?.manager) {
            // emit member trapped

            this.scene.dispatch(
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
