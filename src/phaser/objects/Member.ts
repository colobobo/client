import * as Phaser from "phaser";
import { enums } from "@colobobo/library";
import MainScene, { CollisionCategories } from "../scenes/MainScene";
import { RoundMembersArray } from "../Game";
import { MembersAnimationsConfig, membersShapes } from "../../config/members";

export default class Member extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  id: string;
  status: enums.member.Status = enums.member.Status.waiting;
  scene: MainScene;
  baseScale: number = 1;
  options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
  animationsConfig: MembersAnimationsConfig;
  isDragged: boolean = false;
  skin: enums.member.Skins;
  trappedTimeline: Phaser.Tweens.Timeline;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    frame,
    options,
    id,
    pixelRatio,
    animationsConfig,
    skin
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    texture: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    id: string;
    pixelRatio: number;
    frame?: string;
    animationsConfig: MembersAnimationsConfig;
    skin: enums.member.Skins;
  }) {
    super(scene.matter.world, x, y, texture, frame, options);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;

    this.options = options;

    this.pixelRatio = pixelRatio;

    this.id = id;

    this.animationsConfig = animationsConfig;

    this.skin = skin;

    this.trappedTimeline = this.scene.tweens.createTimeline();

    this.init();
  }

  // FUNCTIONS

  init() {
    this.setBodyWithShape();

    // 25% of areaHeight
    this.setScale(
      ((this.scene.game.areaHeight * 0.32) / this.height) * this.pixelRatio
    );

    // set baseScale
    this.baseScale = this.scale;

    this.setAlpha(0);
    this.setFixedRotation();
    this.disableInteractive();
    this.setCollisionCategory(
      this.scene.collisionCategories[CollisionCategories.member]
    );
    // disable collision
    this.setCollidesWith(0);

    this.createAnimations();
    this.createTween();

    this.setPositionToStartPlatform();
  }

  addEventListeners() {
    // listen collision
    // TODO : use https://github.com/mikewesthad/phaser-matter-collision-plugin
  }

  setPositionToStartPlatform() {
    this.scene?.matter.alignBody(
      this.body as MatterJS.BodyType,
      this.scene.platforms.start!.x,
      (this.scene.platforms.start!.body as MatterJS.BodyType).bounds.min.y,
      Phaser.Display.Align.BOTTOM_CENTER
    );
  }

  setBodyWithShape() {
    const sScale = this.scale;
    const shapes = this.scene.cache.json.get(membersShapes);
    const sCenter = this.getCenter();

    this.setScale(1);
    this.setBody(shapes[this.skin], this.options);
    this.setScale(sScale);

    // re align center
    this.setX(this.x + sCenter.x - this.getCenter().x);
    this.setY(this.y + sCenter.y - this.getCenter().y);
    this.setFixedRotation();
  }

  // ANIMATIONS

  createAnimations() {
    Object.values(this.animationsConfig).forEach(animationConfig => {
      this.scene.anims.create({
        key: animationConfig.animationKey,
        frames: this.scene.anims.generateFrameNames(animationConfig.texture, {
          prefix: animationConfig.prefix,
          start: animationConfig.startFrame,
          end: animationConfig.endFrame,
          zeroPad: 5
        }),
        frameRate: 25
      });
    });
  }

  createTween() {
    this.trappedTimeline
      .add({
        targets: this,
        alpha: 0.2,
        duration: 100
      })
      .add({
        targets: this,
        alpha: 1,
        duration: 100
      })
      .add({
        targets: this,
        alpha: 0,
        duration: 200,
        onComplete: () => {
          this.setVelocity(0, 0);
          this.setPositionToStartPlatform();
        }
      });
  }

  // STATES

  spawned() {
    this.trappedTimeline.pause();
    this.setPositionToStartPlatform();
    this.status = enums.member.Status.active;

    this.setAlpha(1);
    this.play(this.animationsConfig.start.animationKey);

    setTimeout(() => {
      this.setCollidesWith([
        this.scene.collisionCategories[CollisionCategories.default],
        this.scene.collisionCategories[CollisionCategories.member],
        this.scene.collisionCategories[CollisionCategories.platform],
        this.scene.collisionCategories[CollisionCategories.wall]
      ]);
      this.setIgnoreGravity(false);
      this.setInteractive();
    }, 500);
  }

  moved(roundMember: RoundMembersArray[0]) {
    if (!roundMember || this.status !== enums.member.Status.active) return;

    // update member position and velocity
    this.setPosition(
      roundMember.position.x * this.pixelRatio,
      roundMember.position.y * this.pixelRatio
    );

    if (roundMember.isDragged) {
      this.setVelocity(0, 0);
    } else {
      this.setVelocity(
        roundMember.velocity.x * this.pixelRatio,
        roundMember.velocity.y * this.pixelRatio
      );
    }
  }

  draggedStart() {
    this.isDragged = true;

    this.play(this.animationsConfig.drag.animationKey);
    this.anims.setRepeat(-1);
  }

  draggedEnd() {
    console.log("DRAG END");
    this.isDragged = false;
    this.anims.stopOnRepeat();
  }

  trapped() {
    this.setVelocity(0, 0);
    this.setCollidesWith(0);
    this.setIgnoreGravity(true);
    this.status = enums.member.Status.waiting;
    this.disableInteractive();

    // animate

    this.trappedTimeline.play();
  }

  arrived() {
    this.disableInteractive();
    this.setCollidesWith(0);
    this.setIgnoreGravity(true);
    this.setVelocity(0);
    this.status = enums.member.Status.arrived;

    // animate

    this.play(this.animationsConfig.finish.animationKey);

    const bodyHeight =
      (this.body as MatterJS.BodyType).bounds.max.y -
      (this.body as MatterJS.BodyType).bounds.min.y;

    this.scene.tweens.add({
      targets: this,
      x: this.scene.platforms.finish!.x,
      y:
        (this.scene.platforms.finish!.body as MatterJS.BodyType).bounds.min.y -
        bodyHeight / 2,
      duration: 300,
      ease: "Sine.easeIn"
    });
  }
}
