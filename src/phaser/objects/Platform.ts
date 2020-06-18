import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import Member from "./Member";
import { actions } from "../../redux";
import {
  PlatformAnimationsKey,
  PlatformPosition,
  PlatformsPositionConfig,
  PlatformsAnimationConfig
} from "../../config/platforms";

// utils

const getAnimationFrames = (
  scene: Phaser.Scene,
  texture: string,
  animationConfig: PlatformsAnimationConfig
) =>
  scene.anims.generateFrameNames(texture, {
    prefix: animationConfig.prefix,
    start: animationConfig.startFrame,
    end: animationConfig.endFrame,
    zeroPad: 5
  });

// class

export default class Platform extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  position: PlatformPosition;
  scene: MainScene;
  sensor?: Phaser.GameObjects.GameObject;
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
  animationsConfig: PlatformsPositionConfig;
  panelSprite?: Phaser.Physics.Matter.Sprite;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    options,
    position,
    pixelRatio,
    animationsConfig
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    texture: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    position: PlatformPosition;
    pixelRatio: number;
    animationsConfig: PlatformsPositionConfig;
  }) {
    const firstFrame = getAnimationFrames(
      scene,
      texture,
      animationsConfig[PlatformAnimationsKey.lightIn]
    )[0]?.frame as string;

    super(scene.matter.world, x, y, texture, firstFrame, options);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;
    this.options = options;
    this.animationsConfig = animationsConfig;
    this.pixelRatio = pixelRatio;
    this.position = position;

    this.init();
  }

  // FUNCTIONS

  init() {
    this.setBodyWithShape();

    // 80% of areaHeight
    this.setScale(
      ((this.scene.areaHeight * 0.8) / this.height) * this.pixelRatio
    );

    // align to bottom
    this.scene.matter.alignBody(
      this.body as MatterJS.BodyType,
      this.x,
      this.scene.areaHeight * this.pixelRatio,
      Phaser.Display.Align.BOTTOM_CENTER
    );

    this.createAnimations();
    this.createPanelSprite();
    this.createSensor();

    // TODO : animations test
    this.playAnimation(PlatformAnimationsKey.lightIn);
    this.playAnimation(PlatformAnimationsKey.panel);
  }

  setBodyWithShape() {
    const shapes = this.scene.cache.json.get("shapes");
    this.setScale(1);
    this.setBody(shapes.platform, this.options);
  }

  createAnimations() {
    Object.values(this.animationsConfig).forEach(animationConfig => {
      this.scene.anims.create({
        key: animationConfig.animationKey,
        frames: getAnimationFrames(
          this.scene,
          this.texture.key,
          animationConfig
        ),
        repeat: -1,
        frameRate: 25
      });
    });
  }

  playAnimation(platformAnimationKey: PlatformAnimationsKey) {
    const animationKey = this.animationsConfig[platformAnimationKey]
      .animationKey;

    switch (platformAnimationKey) {
      case PlatformAnimationsKey.lightIn:
      case PlatformAnimationsKey.lightOut:
        this.play(animationKey);
        break;
      case PlatformAnimationsKey.panel:
        this.panelSprite?.play(animationKey);
        break;
    }
  }

  createPanelSprite() {
    const panelFirstFrame = getAnimationFrames(
      this.scene,
      this.texture.key,
      this.animationsConfig[PlatformAnimationsKey.panel]
    )[0]?.frame as string;

    const center = this.getCenter();

    this.panelSprite = this.scene.matter.add.sprite(
      center.x,
      center.y,
      this.texture.key,
      panelFirstFrame,
      { isStatic: true }
    );

    this.panelSprite.setScale(this.scale);
    this.panelSprite.setCollidesWith(0);
  }

  createSensor() {
    if (this.position === PlatformPosition.start) {
      this.createStartSensor();
    } else if (this.position === PlatformPosition.finish) {
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
