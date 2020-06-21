import * as Phaser from "phaser";
import { enums } from "@colobobo/library";
import MainScene, { CollisionCategories } from "../scenes/MainScene";
import { RoundMembersArray } from "../Game";
import { MembersAnimationsConfig } from "../../config/members";

export default class Member extends Phaser.Physics.Matter.Sprite {
  pixelRatio: number;
  id: string;
  status: enums.member.Status = enums.member.Status.waiting;
  scene: MainScene;
  baseScale: number = 1;
  animationsConfig: MembersAnimationsConfig;
  isDragged: boolean = false;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    frame,
    options,
    id,
    pixelRatio,
    animationsConfig
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
  }) {
    super(scene.matter.world, x, y, texture, frame, options);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.scene = scene;

    this.pixelRatio = pixelRatio;

    this.id = id;

    this.animationsConfig = animationsConfig;

    this.init();
  }

  // CUSTOM GETTERS

  get baseHeight(): number {
    return this.baseScale * this.height;
  }

  // FUNCTIONS

  init() {
    // 25% of areaHeight
    this.setScale(
      ((this.scene.game.areaHeight * 0.25) / this.height) * this.pixelRatio
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
  }

  addEventListeners() {
    // listen collision
    // TODO : use https://github.com/mikewesthad/phaser-matter-collision-plugin
  }

  setPositionToStartPlatform() {
    this.setX(this.scene.platforms.start!.x);
    this.setY(
      (this.scene.platforms.start!.body as MatterJS.BodyType).bounds.min.y -
        this.baseHeight / 2
    );
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

  spawned() {
    this.setPositionToStartPlatform();
    this.setFixedRotation();
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
    this.setVelocity(0);
    this.setIgnoreGravity(true);
    this.setCollidesWith(0);
    this.disableInteractive();
    this.status = enums.member.Status.waiting;

    // animate

    // TODO: animate collision
    this.setAlpha(0);

    // this.scene.tweens.add({
    //   targets: this,
    //   alpha: 0,
    //   scale: 0.2,
    //   duration: 400,
    //   ease: "Sine.easeIn"
    // });
  }

  arrived() {
    this.disableInteractive();
    this.setCollidesWith(0);
    this.setIgnoreGravity(true);
    this.setVelocity(0);
    this.status = enums.member.Status.arrived;

    // animate

    this.play(this.animationsConfig.finish.animationKey);

    this.scene.tweens.add({
      targets: this,
      x: this.scene.platforms.finish!.x,
      y:
        (this.scene.platforms.finish!.body as MatterJS.BodyType).bounds.min.y -
        this.displayHeight / 2,
      duration: 300,
      ease: "Sine.easeIn",
      onComplete: () => {
        this.setAlpha(0);
      }
    });
  }
}
