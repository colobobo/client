import * as Phaser from "phaser";
import {
  enums,
  PlayerRolePropertiesPlateform,
  PlayerRolePropertiesTrap
} from "@colobobo/library";
import * as config from "../../config";
import { PlatformPosition, platformsTexture } from "../../config/platforms";
import { TrapsAnimationConfig } from "../../config/traps";
import { actions } from "../../redux";
import * as utils from "../../utils";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Member from "../objects/Member";
import Platform from "../objects/Platform";
import Trap from "../objects/Trap";
import Game, { RoundMembersArray } from "../Game";
import Wall from "../objects/Wall";
import { membersTexture } from "../../config/members";

export enum CollisionCategories {
  default = "default",
  member = "member",
  platform = "platform",
  wall = "wall"
}

export default class MainScene extends Phaser.Scene {
  // custom game class
  game: Game;

  // scene plugin
  matterCollision: typeof PhaserMatterCollisionPlugin;

  // scene variables
  collisionCategories: { [key in CollisionCategories]: number } = {
    [CollisionCategories.default]: 1,
    [CollisionCategories.member]: 0,
    [CollisionCategories.platform]: 0,
    [CollisionCategories.wall]: 0
  };
  pointerContraint: Phaser.Physics.Matter.PointerConstraint | null = null;
  members: Member[] = [];
  platforms: {
    [key in PlatformPosition]?: Platform;
  } = {};

  constructor({ game }: { game: Game }) {
    super({});
    this.game = game;
    console.log("MainScene : constructor");
  }

  // GETTERS

  getPlayerWithPlatformRole(): string {
    return Object.keys(this.game.playersRole).find(
      playerId =>
        this.game.playersRole[playerId].role === enums.player.Role.platform
    ) as string;
  }

  getPlayersWithTrapRole(): string[] {
    return Object.keys(this.game.playersRole).filter(
      playerId =>
        this.game.playersRole[playerId].role === enums.player.Role.trap
    );
  }

  getWaitingMembers(): RoundMembersArray {
    return this.game.roundMembersArray.filter(
      roundMember => roundMember.status === enums.member.Status.waiting
    );
  }

  getArrivedMembers(): RoundMembersArray {
    return this.game.roundMembersArray.filter(
      roundMember => roundMember.status === enums.member.Status.arrived
    );
  }

  // ########## FUNCTIONS ##########

  // ---------- CREATE ----------

  // generate collision categories

  createCollisionCategories() {
    Object.values(CollisionCategories).forEach(category => {
      if (category === CollisionCategories.default) return;
      this.collisionCategories[category] = this.matter.world.nextCategory();
    });
  }

  // create floor

  createFloor() {
    const floorSensor = this.matter.add.rectangle(
      (this.game.areaWidth * this.game.pixelRatio) / 2,
      this.game.areaHeight * this.game.pixelRatio - 5,
      this.game.areaWidth * this.game.pixelRatio,
      10,

      {
        isSensor: true,
        isStatic: true,
        ignorePointer: true
      }
    );

    // listen collision start
    this.matterCollision.addOnCollideStart({
      objectA: floorSensor,
      callback: (e: any) => {
        const { gameObjectB } = e;

        console.log("floor collision");
        // if collide with member
        if (gameObjectB instanceof Member) {
          const roundMember = this.game.roundMembersArray.find(
            member => member.id === gameObjectB.id
          );
          // if i'm the player manager
          if (this.game.playerId === roundMember?.manager) {
            // emit member arrived

            this.game.dispatch(
              actions.webSocket.emit.round.memberTrapped({
                memberId: gameObjectB.id
              })
            );
          }
        }
      }
    });
  }

  // create members and add to scene

  createMembers() {
    this.game.roundMembersArray.forEach((roundMember, i) => {
      const memberAnimationsConfig = config.members[roundMember.skin];

      const firstFrame = this.anims.generateFrameNames(
        memberAnimationsConfig.start.texture,
        {
          prefix: memberAnimationsConfig.start.prefix,
          start: memberAnimationsConfig.start.startFrame,
          end: memberAnimationsConfig.start.endFrame,
          zeroPad: 5
        }
      )[0]?.frame as string;

      const member = new Member({
        scene: this,
        texture: membersTexture,
        frame: firstFrame,
        options: {
          plugin: {
            wrap: utils.phaser.getGameWrapConfig(
              this.game.areaWidth * this.game.pixelRatio,
              this.game.areaHeight * this.game.pixelRatio
            )
          },
          restitution: 0,
          friction: 0.002,
          // frictionStatic: 0.05,
          frictionAir: 0.02,
          ignoreGravity: true
        },
        id: roundMember.id,
        animationsConfig: memberAnimationsConfig,
        skin: roundMember.skin,
        pixelRatio: this.game.pixelRatio
      });

      member.addEventListeners();

      // add member to members array
      this.members.push(member);
    });
  }

  createPlatformsAndWall() {
    const playerWithPlatformRole = this.getPlayerWithPlatformRole();

    if (!playerWithPlatformRole) return;

    const device = this.game.areaDevices[playerWithPlatformRole];
    const role = this.game.playersRole[playerWithPlatformRole];

    // PLATFORMS

    const leftRightPosition = {
      left: {
        x: (device.offsetX + device.width * 0.2) * this.game.pixelRatio
      },
      right: {
        x: (device.offsetX + device.width * 0.8) * this.game.pixelRatio
      }
    };

    const startFinishPosition = {
      start:
        (role.properties as PlayerRolePropertiesPlateform).direction ===
        enums.round.Direction.leftToRight
          ? leftRightPosition.left
          : leftRightPosition.right,
      finish:
        (role.properties as PlayerRolePropertiesPlateform).direction ===
        enums.round.Direction.leftToRight
          ? leftRightPosition.right
          : leftRightPosition.left
    };

    // start

    this.platforms.start = new Platform({
      scene: this,
      position: PlatformPosition.start,
      x: startFinishPosition.start.x,
      texture: platformsTexture,
      options: { isStatic: true },
      pixelRatio: this.game.pixelRatio,
      animationsConfig: config.getPlatFormsConfig(this.game.world).start
    });

    // finish

    this.platforms.finish = new Platform({
      scene: this,
      position: PlatformPosition.finish,
      x: startFinishPosition.finish.x,
      texture: platformsTexture,
      options: { isStatic: true },
      pixelRatio: this.game.pixelRatio,
      animationsConfig: config.getPlatFormsConfig(this.game.world).finish
    });

    // WALL

    new Wall({
      scene: this,
      pixelRatio: this.game.pixelRatio,
      x: (device.offsetX + device.width * 0.5) * this.game.pixelRatio,
      animationConfig: config.walls[this.game.world],
      options: { isStatic: true, isSensor: true, ignorePointer: true }
    });
  }

  createTraps() {
    const playersWithTrapRole = this.getPlayersWithTrapRole();

    playersWithTrapRole.forEach(playerId => {
      if (this.game.playerId !== playerId) return;

      const device = this.game.areaDevices[playerId];
      const playerRole = this.game.playersRole[playerId];
      const playerRolePropertiesTrap = playerRole.properties as PlayerRolePropertiesTrap;

      /* eslint-disable */
      // prettier-ignore
      // @ts-ignore
      const trapAnimationConfig: TrapsAnimationConfig = config.traps[this.game.world][playerRolePropertiesTrap.type];
      /* eslint-enable */

      new Trap({
        pixelRatio: this.game.pixelRatio,
        scene: this,
        x: (device.offsetX + device.width * 0.5) * this.game.pixelRatio,
        y: 0,
        options: { isStatic: true },
        animationConfig: trapAnimationConfig,
        animationRepeatDelay: playerRolePropertiesTrap.interval,
        collisionEnabled: false
      });
    });
  }

  // matter world event listeners

  addMatterWorldEventListeners() {
    // listen drag start
    this.matter.world.on("dragstart", (body: MatterJS.BodyType) => {
      console.log("dragstart ->", (body.gameObject as Member)?.id);

      if (body.gameObject instanceof Member) {
        this.game.dispatch(
          actions.webSocket.emit.round.memberDragStart({
            playerId: this.game.playerId,
            memberId: body.gameObject.id
          })
        );
      }
    });

    // listen drag end
    this.matter.world.on("dragend", (body: MatterJS.BodyType) => {
      // reset pointer constraint
      this.pointerContraint!.constraint.length = 0.01;
      this.pointerContraint!.constraint.damping = 0;

      if (body.gameObject instanceof Member) {
        console.log("member drag end");
        this.game.dispatch(
          actions.webSocket.emit.round.memberDragEnd({
            memberId: body.gameObject.id
          })
        );
      }
    });

    this.matter.world.on("beforeupdate", () => {
      const { pointA, pointB, bodyB } = this.pointerContraint!.constraint;
      // pointA is pointer
      // pointB is drag start point
      // bodyB is the dragged body

      if (bodyB && pointA && pointB) {
        const pointBRealCoordinate = {
          x: bodyB.position.x + pointB.x,
          y: bodyB.position.y + pointB.y
        };

        const distance = Phaser.Math.Distance.BetweenPoints(
          pointBRealCoordinate,
          pointA
        );

        // if distance between pointA & pointB is higher than a threshold
        if (distance > 25) {
          // change pointer constraint based on distance
          // -> prevent Continuous Collision Detection issue
          this.pointerContraint!.constraint.length = distance * 0.77;
          this.pointerContraint!.constraint.damping = 0.7;
        } else {
          this.pointerContraint!.constraint.length = 0.01;
          this.pointerContraint!.constraint.damping = 0;
        }
      }
    });
  }

  // ---------- UPDATE ----------

  newMemberSpawn() {
    const waitingMember = this.getWaitingMembers();
    // if were are waiting member and my role is plateform
    if (
      waitingMember[0] &&
      this.game.playerId === this.getPlayerWithPlatformRole()
    ) {
      console.log("SPAWN >>>>> ", waitingMember[0].id);
      // emit member spawned
      this.game.dispatch(
        actions.webSocket.emit.round.memberSpawned({
          memberId: waitingMember[0].id
        })
      );
    }
  }

  // member : spawned

  onMemberSpawned(member: Member) {
    console.log("on member spawned", member.id);
    member.spawned();
    this.platforms.start?.animateMemberSpawned();
  }

  // member : moved

  onMemberMoved(member: Member, roundMember: RoundMembersArray[0]) {
    // disable gravity
    // memberMatter.setIgnoreGravity(true);
    member.moved(roundMember);
  }

  // member : dragged start

  onMemberDraggedStart(member: Member) {
    member.draggedStart();
  }

  // member : dragged end

  onMemberDraggedEnd(member: Member) {
    member.draggedEnd();
  }

  // member : trapped

  onMemberTrapped(member: Member) {
    console.log("on member trapped", member.id);

    member.trapped();

    const waitingMembers = this.getWaitingMembers();

    this.platforms.start?.updateCounterText();

    // TODO: refacto
    if (waitingMembers.length === 1) {
      setTimeout(() => {
        if (!this.platforms.start?.sensor!.getData("hasMemberOn")) {
          this.newMemberSpawn();
        }
      }, 800);
    }
  }

  // member : arrived

  onMemberArrived(member: Member) {
    console.log("on member arrived", member.id);
    member.arrived();
    this.platforms.finish?.animateMemberArrived();
  }

  // round tick : members update

  onGameMembersUpdate() {
    this.game.roundMembersArray.forEach(roundMember => {
      const member = this.members.find(
        _member => _member.id === roundMember.id
      );

      if (!member) return;

      // if I'm not the member manager
      if (roundMember.manager && roundMember.manager !== this.game.playerId) {
        // move member
        this.onMemberMoved(member, roundMember);
      }

      // if status are different
      if (roundMember.status !== member.status) {
        // waiting -> active : member spawned
        if (
          member.status === enums.member.Status.waiting &&
          roundMember.status === enums.member.Status.active
        ) {
          this.onMemberSpawned(member);
        }

        // active -> waiting : member trapped
        if (
          member.status === enums.member.Status.active &&
          roundMember.status === enums.member.Status.waiting
        ) {
          this.onMemberTrapped(member);
        }

        // active -> arrived : member arrived
        if (
          member.status === enums.member.Status.active &&
          roundMember.status === enums.member.Status.arrived
        ) {
          this.onMemberArrived(member);
        }
      }

      // if isDragged is different
      if (roundMember.isDragged !== member.isDragged) {
        if (roundMember.isDragged) {
          this.onMemberDraggedStart(member);
        } else {
          this.onMemberDraggedEnd(member);
        }
      }
    });
  }

  // ---------- START ----------

  start() {
    // TODO
  }

  // ########## PHASER SCENE FUNCTIONS ##########

  preload() {}

  create() {
    console.log("MainScene : Create");

    // move camera with device offsetX

    const device = this.game.areaDevices[this.game.playerId];
    this.cameras.main.setScroll(device.offsetX * this.game.pixelRatio, 0);

    this.createCollisionCategories();

    this.createFloor();

    this.createPlatformsAndWall();

    this.createTraps();

    this.createMembers();

    this.addMatterWorldEventListeners();

    // enable drag and drop in matter
    // @ts-ignore
    this.pointerContraint = this.matter.add.pointerConstraint({
      stiffness: 0.15,
      render: {
        visible: true
      }
    });

    setTimeout(() => {
      this.newMemberSpawn();
    }, 2000);

    this.events.on("destroy", () => {
      console.log("scene destroy");
    });

    this.events.on("shutdown", () => {
      console.log("scene shutdown");
    });
  }

  destroy() {
    this.scene.pause();
    this.members = [];
    this.matter.world.resetCollisionIDs();
    this.matter.world.destroy();
    this.matterCollision.removeAllCollideListeners();
    this.scene.remove();
  }

  update(time: number, delta: number) {
    this.game.roundMembersArray.forEach(roundMember => {
      // if I'm the member manager
      if (this.game.playerId === roundMember.manager) {
        const member = this.members.find(
          _member => _member.id === roundMember.id
        );
        const memberBody = member?.body as MatterJS.BodyType;
        if (member && memberBody) {
          // enable gravity
          // member.setIgnoreGravity(false);
          // emit normalized position and velocity of member
          this.game.dispatch(
            actions.webSocket.emit.round.memberMove({
              position: {
                x: memberBody.position.x / this.game.pixelRatio,
                y: memberBody.position.y / this.game.pixelRatio
              },
              velocity: {
                x: memberBody.velocity.x / this.game.pixelRatio,
                y: memberBody.velocity.y / this.game.pixelRatio
              },
              id: roundMember.id
            })
          );
        }
      }
    });
  }
}
