import * as Phaser from "phaser";
import MainScene, { CollisionCategories, RoundMembersArray } from "./MainScene";
import { enums } from "@colobobo/library";

export default class Member extends Phaser.Physics.Matter.Image {
  readonly id: string;
  status: enums.member.Status = enums.member.Status.waiting;
  scene: MainScene;
  readonly baseScale: number;

  constructor({
    scene,
    x = 0,
    y = 0,
    texture,
    options,
    id,
    baseScale = 0.42
  }: {
    scene: MainScene;
    x?: number;
    y?: number;
    texture: string;
    options?: Phaser.Types.Physics.Matter.MatterBodyConfig;
    id: string;
    baseScale?: number;
  }) {
    super(scene.matter.world, x, y, texture, undefined, options);

    scene.sys.displayList.add(this);

    this.scene = scene;

    this.id = id;

    this.baseScale = baseScale;

    this.init();
  }

  // CUSTOM GETTERS

  get baseHeight(): number {
    return this.baseScale * this.height;
  }

  // FUNCTIONS

  init() {
    this.setScale(this.baseScale);
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
    this.setX(this.scene.plateforms.start!.x);
    this.setY(
      this.scene.plateforms.start!.y -
        this.scene.plateforms.start!.displayHeight / 2 -
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
    this.setPosition(roundMember.position.x, roundMember.position.y);
    this.setVelocity(roundMember.velocity.x, roundMember.velocity.y);
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
      x: this.scene.plateforms.finish!.x,
      y:
        this.scene.plateforms.finish!.y -
        this.scene.plateforms.finish!.displayHeight / 2 -
        this.displayHeight / 2,
      scale: 0.2,
      duration: 600,
      ease: "Sine.easeIn"
    });
  }
}
