import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import Member from "./Member";
import { actions } from "../../redux";
import { AnimationConfig } from "../../config/platforms";

export enum PlatformType {
  start = "start",
  finish = "finish"
}

export enum AnimationKeys {
  spawn = "spawn"
}

export default class Platform extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  type: PlatformType;
  scene: MainScene;
  sensor?: Phaser.GameObjects.GameObject;
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
  animationConfig: AnimationConfig;
  animationKeys?: {
    [AnimationKeys.spawn]: string;
  };

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    options,
    type,
    pixelRatio,
    animationConfig
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    texture: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    type: PlatformType;
    pixelRatio: number;
    animationConfig: AnimationConfig;
  }) {
    const firstFrame = scene.anims.generateFrameNames(texture, {
      prefix: animationConfig.prefix,
      start: animationConfig.startFrame,
      end: animationConfig.endFrame,
      zeroPad: 5
    })[0]?.frame as string;

    super(scene.matter.world, x, y, texture, firstFrame, options);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;
    this.options = options;
    this.animationConfig = animationConfig;

    this.pixelRatio = pixelRatio;
    this.type = type;

    this.animationKeys = {
      [AnimationKeys.spawn]:
        animationConfig.animationKey + [AnimationKeys.spawn]
    };

    this.init();
  }

  // FUNCTIONS

  init() {
    this.updateBodyWithShape();

    // 90% of areaHeight
    this.setScale(
      ((this.scene.areaHeight * 0.9) / this.height) * this.pixelRatio
    );

    // align to bottom
    this.scene.matter.alignBody(
      this.body as MatterJS.BodyType,
      this.x,
      this.scene.areaHeight * this.pixelRatio,
      Phaser.Display.Align.BOTTOM_CENTER
    );

    this.createSensor();
    this.createAnimation();
  }

  updateBodyWithShape() {
    const shapes = this.scene.cache.json.get("shapes");

    this.setScale(1);

    this.setBody(shapes.platform, this.options);
  }

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

    this.play(this.animationConfig.animationKey);
  }

  createSensor() {
    if (this.type === PlatformType.start) {
      this.createStartSensor();
    } else if (this.type === PlatformType.finish) {
      this.createFinishSensor();
    }
  }

  createStartSensor() {
    this.sensor = this.scene.matter.add.gameObject(
      this.scene.add.rectangle(
        this.x,
        (this.body as MatterJS.BodyType).bounds.min.y - 150 * this.pixelRatio,
        this.displayWidth,
        300 * this.pixelRatio
      ),
      {
        isSensor: true,
        isStatic: true,
        ignorePointer: true
      }
    );

    // listen collisions active
    this.scene.matterCollision.addOnCollideActive({
      objectA: this.sensor,
      callback: (e: any) => {
        const { gameObjectB } = e;
        // if collide with member
        if (gameObjectB instanceof Member) {
          this.sensor!.setData("isColliding", true);
        }
      }
    });

    // listen collisions end
    this.scene.matterCollision.addOnCollideEnd({
      objectA: this.sensor,
      callback: (e: any) => {
        const { gameObjectB } = e;
        // if collide with member
        if (gameObjectB instanceof Member) {
          this.sensor!.setData("isColliding", false);
          // wait 0.5 second
          setTimeout(() => {
            // if sensor not colliding currently : new member spawn
            if (!this.sensor!.getData("isColliding")) {
              this.scene.newMemberSpawn();
            }
          }, 500);
        }
      }
    });
  }

  createFinishSensor() {
    this.sensor = this.scene.matter.add.gameObject(
      this.scene.add.rectangle(
        this.x,
        (this.body as MatterJS.BodyType).bounds.min.y - 5 * this.pixelRatio,
        this.displayWidth / 4,
        10 * this.pixelRatio
      ),
      {
        isSensor: true,
        isStatic: true,
        ignorePointer: true
      }
    );

    // listen collision start
    this.scene.matterCollision.addOnCollideStart({
      objectA: this.sensor,
      callback: (e: any) => {
        const { gameObjectB } = e;

        // if collide with member and my role is plateforms
        if (
          gameObjectB instanceof Member &&
          this.scene.playerId === this.scene.getPlayerWithPlatformRole()
        ) {
          // emit member arrived
          this.scene.dispatch(
            actions.webSocket.emit.round.memberArrived({
              memberId: gameObjectB.id
            })
          );
        }
      }
    });
  }
}
