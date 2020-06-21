import * as Phaser from "phaser";
import { enums } from "@colobobo/library";
import MainScene, { CollisionCategories } from "../scenes/MainScene";
import { RoundMembersArray } from "../Game";

export default class Member extends Phaser.Physics.Matter.Image {
  pixelRatio: number;
  readonly id: string;
  status: enums.member.Status = enums.member.Status.waiting;
  scene: MainScene;
  baseScale: number = 1;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    options,
    id,
    pixelRatio
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    texture: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    id: string;
    pixelRatio: number;
  }) {
    super(scene.matter.world, x, y, texture, undefined, options);

    scene.sys.displayList.add(this);

    this.scene = scene;

    this.pixelRatio = pixelRatio;

    this.id = id;

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

  spawned() {
    this.setPositionToStartPlatform();
    this.setFixedRotation();

    this.status = enums.member.Status.active;

    this.scene.tweens.add({
      alpha: 1,
      targets: this,
      scale: { from: 0.2, to: this.baseScale },
      ease: "Sine.easeOut",
      duration: 600,
      onComplete: () => {
        this.setCollidesWith([
          this.scene.collisionCategories[CollisionCategories.default],
          this.scene.collisionCategories[CollisionCategories.member],
          this.scene.collisionCategories[CollisionCategories.platform],
          this.scene.collisionCategories[CollisionCategories.wall]
        ]);
        this.setIgnoreGravity(false);
        this.setInteractive();
      }
    });
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

  trapped() {
    this.setVelocity(0);
    this.setIgnoreGravity(true);
    this.setCollidesWith(0);
    this.disableInteractive();
    this.status = enums.member.Status.waiting;

    // animate
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      scale: 0.2,
      duration: 400,
      ease: "Sine.easeIn"
    });
  }

  arrived() {
    this.disableInteractive();
    this.setCollidesWith(0);
    this.setIgnoreGravity(true);
    this.setVelocity(0);
    this.status = enums.member.Status.arrived;

    // animate
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      x: this.scene.platforms.finish!.x,
      y:
        (this.scene.platforms.finish!.body as MatterJS.BodyType).bounds.min.y -
        this.displayHeight / 2,
      scale: 0.2,
      duration: 600,
      ease: "Sine.easeIn"
    });
  }
}
