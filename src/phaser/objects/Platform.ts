import * as Phaser from "phaser";
import MainScene from "../scenes/MainScene";
import Member from "./Member";
import { actions } from "../../redux";
import {
  PlatformAnimationsKey,
  PlatformPosition,
  PlatformsAnimationConfig,
  PlatformsPositionConfig
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
  raySprite?: Phaser.Physics.Matter.Sprite;
  counterText?: Phaser.GameObjects.Text;

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

    // set scale in % of areaHeight
    this.setScale(
      ((this.scene.areaHeight * 0.84) / this.height) * this.pixelRatio
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
    this.createRaySprite();
    this.createCounterText();
    this.createSensor();
  }

  setBodyWithShape() {
    const shapes = this.scene.cache.json.get("shapes");
    this.setScale(1);
    this.setBody(shapes.platform, this.options);
  }

  // PANEL SPRITE

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

  // RAY SPRITE

  createRaySprite() {
    const rayFirstFrame = getAnimationFrames(
      this.scene,
      this.texture.key,
      this.animationsConfig[PlatformAnimationsKey.ray]
    )[0]?.frame as string;

    const center = this.getCenter();

    this.raySprite = this.scene.matter.add.sprite(
      center.x,
      center.y,
      this.texture.key,
      rayFirstFrame,
      { isStatic: true }
    );

    this.raySprite.setScale(this.scale);
    this.raySprite.setCollidesWith(0);
    this.raySprite.setDepth(3);
  }

  // COUNTER TEXT

  createCounterText() {
    const textStyles: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "Mikado",
      fontStyle: "bold",
      fontSize: "61px",
      color: this.position === PlatformPosition.start ? "#EF5252" : "#40FF84"
    };

    const text = this.getNewCounterTextText();

    this.counterText = this.scene.add.text(this.x, this.y, text, textStyles);
    this.counterText.setScale(this.scale);
    this.counterText.setDepth(2);

    // horizontal center
    this.counterText.setX(this.x - this.counterText.displayWidth / 2);
    // set Y : 53.1% of height from top
    this.counterText.setY(this.getTopCenter().y + this.displayHeight * 0.531);
  }

  getNewCounterTextText(): string {
    let text = "";
    switch (this.position) {
      case PlatformPosition.start:
        text = `${this.scene.getWaitingMembers().length}`;
        break;
      case PlatformPosition.finish:
        text = `${this.scene.getArrivedMembers().length}`;
        break;
    }
    return text;
  }

  updateCounterText() {
    const text = this.getNewCounterTextText();

    if (text !== this.counterText?.text) {
      this.playAnimation(PlatformAnimationsKey.panel);

      setTimeout(() => {
        // change text
        this.counterText?.setText(text);
        // horizontal center
        this.counterText?.setX(this.x - this.counterText?.displayWidth / 2);
      }, 50);
    }
  }

  // SENSORS

  createSensor() {
    if (this.position === PlatformPosition.start) {
      this.createStartSensor();
      this.createStartLightOutSensor();
    } else if (this.position === PlatformPosition.finish) {
      this.createFinishSensor();
    }
  }

  // START SENSORS

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
          this.sensor!.setData("hasMemberOn", true);
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
          this.sensor!.setData("hasMemberOn", false);
          // wait 0.5 second
          setTimeout(() => {
            // if sensor not currently colliding with member : new member spawn
            if (!this.sensor!.getData("hasMemberOn")) {
              this.scene.newMemberSpawn();
            }
          }, 500);
        }
      }
    });
  }

  // START LIGHTOUT SENSOR

  createStartLightOutSensor() {
    const lightOutSensor = this.scene.matter.add.gameObject(
      this.scene.add.rectangle(
        this.x,
        (this.body as MatterJS.BodyType).bounds.min.y - 2 * this.pixelRatio,
        this.displayWidth / 4,
        4 * this.pixelRatio
      ),
      {
        isSensor: true,
        isStatic: true,
        ignorePointer: true
      }
    );

    // listen collisions end
    this.scene.matterCollision.addOnCollideEnd({
      objectA: lightOutSensor,
      callback: (e: any) => {
        const { gameObjectB } = e;
        // if collide end with member
        if (gameObjectB instanceof Member) {
          if (
            this.anims.currentAnim.key ===
              this.animationsConfig[PlatformAnimationsKey.lightIn]
                .animationKey &&
            this.anims.isPlaying
          ) {
            this.anims.chain(
              this.animationsConfig[PlatformAnimationsKey.lightOut].animationKey
            );
          } else if (
            this.anims.currentAnim.key !==
            this.animationsConfig[PlatformAnimationsKey.lightOut].animationKey
          ) {
            this.playAnimation(PlatformAnimationsKey.lightOut, true);
          }
        }
      }
    });
  }

  // FINISH SENSOR

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

  // ANIMATIONS

  createAnimations() {
    Object.values(this.animationsConfig).forEach(animationConfig => {
      this.scene.anims.create({
        key: animationConfig.animationKey,
        frames: getAnimationFrames(
          this.scene,
          this.texture.key,
          animationConfig
        ),
        frameRate: 25
      });
    });
  }

  playAnimation(
    platformAnimationKey: PlatformAnimationsKey,
    ignoreIfPlaying: boolean = false
  ) {
    const animationKey = this.animationsConfig[platformAnimationKey]
      .animationKey;

    switch (platformAnimationKey) {
      case PlatformAnimationsKey.lightIn:
      case PlatformAnimationsKey.lightOut:
        this.play(animationKey, ignoreIfPlaying);
        break;
      case PlatformAnimationsKey.panel:
        this.panelSprite?.play(animationKey);
        break;
      case PlatformAnimationsKey.ray:
        this.raySprite?.play(animationKey);
        break;
    }
  }

  animateMemberSpawned() {
    this.playAnimation(PlatformAnimationsKey.lightIn);
    this.playAnimation(PlatformAnimationsKey.ray);
    this.updateCounterText();
  }

  animateMemberArrived() {
    this.playAnimation(PlatformAnimationsKey.lightIn);
    this.playAnimation(PlatformAnimationsKey.ray);
    this.updateCounterText();
  }
}
