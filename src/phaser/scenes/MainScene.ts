import * as Phaser from "phaser";
import {
  enums,
  PlayerRolePropertiesPlateform,
  PlayerRolePropertiesTrap
} from "@colobobo/library";
import * as config from "../../config";
import { PlatformPosition, platformsTexture } from "../../config/platforms";
import {
  getTrapsTexture,
  TrapsAnimationConfig,
  TrapsConfigsByWorlds
} from "../../config/traps";
import { actions, selectors } from "../../redux";
import { Dispatch } from "redux";
import * as utils from "../../utils";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Member from "../objects/Member";
import Platform from "../objects/Platform";
import Trap, { TrapLocation } from "../objects/Trap";

export type RoundMembersArray = ReturnType<
  typeof selectors.round.selectMembersAsArray
>;
type PlayersRole = ReturnType<typeof selectors.round.selectPlayersRole>;
type AreaDevices = ReturnType<typeof selectors.area.selectDevices>;

export enum CollisionCategories {
  default = "default",
  member = "member",
  platform = "platform",
  wall = "wall"
}

export default class MainScene extends Phaser.Scene {
  // scene plugin
  matterCollision: typeof PhaserMatterCollisionPlugin;

  // device data
  pixelRatio: number;

  // data from redux store
  dispatch: Dispatch;
  playerId: string;
  roundMembersArray: RoundMembersArray;
  isRoundStarted: boolean;
  world: enums.World;
  playersRole: PlayersRole;
  areaDevices: AreaDevices;
  areaHeight: number;
  areaWidth: number;

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

  constructor({
    dispatch,
    world,
    playerId,
    playersRole,
    areaDevices,
    roundMembersArray,
    isRoundStarted,
    areaWidth,
    areaHeight,
    pixelRatio
  }: {
    dispatch: Dispatch;
    world: enums.World;
    playerId: string;
    playersRole: PlayersRole;
    areaDevices: AreaDevices;
    roundMembersArray: RoundMembersArray;
    isRoundStarted: boolean;
    areaWidth: number;
    areaHeight: number;
    pixelRatio: number;
  }) {
    super({ key: "main-scene" });

    this.pixelRatio = pixelRatio;

    this.dispatch = dispatch;
    this.playerId = playerId;
    this.roundMembersArray = roundMembersArray;
    this.isRoundStarted = isRoundStarted;
    this.world = world;
    this.playersRole = playersRole;
    this.areaDevices = areaDevices;
    this.areaWidth = areaWidth;
    this.areaHeight = areaHeight;
  }

  // SETTERS

  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  setPlayerId(playerId: string) {
    this.playerId = playerId;
  }

  setRoundMembersArray(roundMembersArray: RoundMembersArray) {
    this.roundMembersArray = roundMembersArray;
    this.onGameMembersUpdate();
  }

  setWorld(world: enums.World) {
    this.world = world;
  }

  setPlayersRole(playersRole: PlayersRole) {
    this.playersRole = playersRole;
  }

  setAreaDevices(areaDevices: AreaDevices) {
    this.areaDevices = areaDevices;
  }

  // GETTERS

  getPlayerWithPlatformRole(): string {
    return Object.keys(this.playersRole).find(
      playerId => this.playersRole[playerId].role === enums.player.Role.platform
    ) as string;
  }

  getPlayersWithTrapRole(): string[] {
    return Object.keys(this.playersRole).filter(
      playerId => this.playersRole[playerId].role === enums.player.Role.trap
    );
  }

  getWaitingMembers(): RoundMembersArray {
    return this.roundMembersArray.filter(
      roundMember => roundMember.status === enums.member.Status.waiting
    );
  }

  getArrivedMembers(): RoundMembersArray {
    return this.roundMembersArray.filter(
      roundMember => roundMember.status === enums.member.Status.arrived
    );
  }

  // ########## FUNCTIONS ##########

  // ---------- PRELOAD ----------

  // load members

  loadMembers() {
    Object.values(enums.member.Skins).forEach(memberSkin => {
      // load skins texture
      this.load.svg(config.members[memberSkin].skin);
    });
  }

  loadPlatforms() {
    // TODO : remove
    Object.values(enums.World).forEach(world => {
      // load left platform
      this.load.svg(config.worlds[world].platforms.left);
      // load right platform
      this.load.svg(config.worlds[world].platforms.right);
      // load wall
      this.load.svg(config.worlds[world].platforms.wall);
    });

    // plateforms spritesheets
    this.load.multiatlas({
      key: platformsTexture,
      atlasURL: "assets/spritesheets/platforms/atlas.json",
      path: "assets/spritesheets/platforms/"
    });
  }

  loadTraps() {
    // traps spritesheets
    this.load.multiatlas({
      key: getTrapsTexture(this.world),
      atlasURL: `assets/spritesheets/traps/${this.world}/atlas.json`,
      path: `assets/spritesheets/traps/${this.world}/`
    });
  }

  loadShapes() {
    this.load.json("shapes", "assets/shapes/shapes.json");
  }

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
      this.game.canvas.width / 2,
      this.game.canvas.height - 5,
      this.game.canvas.width,
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
          const roundMember = this.roundMembersArray.find(
            member => member.id === gameObjectB.id
          );
          // if i'm the player manager
          if (this.playerId === roundMember?.manager) {
            // emit member arrived

            this.dispatch(
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
    this.roundMembersArray.forEach((roundMember, i) => {
      const member = new Member({
        scene: this,
        texture: config.members[roundMember.skin].skin.key,
        options: {
          plugin: { wrap: utils.phaser.getGameWrapConfig(this.game) },
          restitution: 0,
          friction: 0.002,
          // frictionStatic: 0.05,
          frictionAir: 0.02,
          ignoreGravity: true
        },
        id: roundMember.id,
        pixelRatio: this.pixelRatio
      });

      member.setPositionToStartPlatform();
      member.addEventListeners();

      // add member to members array
      this.members.push(member);
    });
  }

  createPlatformsAndWall() {
    const playerWithPlatformRole = this.getPlayerWithPlatformRole();

    if (!playerWithPlatformRole) return;

    const device = this.areaDevices[playerWithPlatformRole];
    const role = this.playersRole[playerWithPlatformRole];

    // PLATFORMS

    const leftRightPosition = {
      left: {
        x: (device.offsetX + device.width * 0.2) * this.pixelRatio
      },
      right: {
        x: (device.offsetX + device.width * 0.8) * this.pixelRatio
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
      pixelRatio: this.pixelRatio,
      animationsConfig: config.getPlatFormsConfig(this.world).start
    });

    // finish

    this.platforms.finish = new Platform({
      scene: this,
      position: PlatformPosition.finish,
      x: startFinishPosition.finish.x,
      texture: platformsTexture,
      options: { isStatic: true },
      pixelRatio: this.pixelRatio,
      animationsConfig: config.getPlatFormsConfig(this.world).finish
    });

    // WALL

    const wall = this.matter.add.image(
      (device.offsetX + device.width * 0.5) * this.pixelRatio,
      0,
      config.worlds[this.world].platforms.wall.key,
      undefined,
      {
        isStatic: true,
        frictionStatic: 0,
        friction: 0
      }
    );

    // 100% of areaHeight
    wall.setScale((this.areaHeight / wall.height) * this.pixelRatio);

    // set y
    wall.setY(wall.y + wall.displayHeight / 2);
  }

  createTraps() {
    const playersWithTrapRole = this.getPlayersWithTrapRole();

    playersWithTrapRole.forEach(playerId => {
      const device = this.areaDevices[playerId];
      const playerRole = this.playersRole[playerId];
      const playerRolePropertiesTrap = playerRole.properties as PlayerRolePropertiesTrap;

      /* eslint-disable */
      // prettier-ignore-start
      // @ts-ignore
      const trapAnimationConfig: TrapsAnimationConfig =
        config.traps[this.world][playerRolePropertiesTrap.type];
      // prettier-ignore-end
      /* eslint-enable */

      new Trap({
        pixelRatio: this.pixelRatio,
        scene: this,
        x: (device.offsetX + device.width * 0.5) * this.pixelRatio,
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
        this.dispatch(
          actions.webSocket.emit.round.memberDragStart({
            playerId: this.playerId,
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
      this.playerId === this.getPlayerWithPlatformRole()
    ) {
      console.log("SPAWN >>>>> ", waitingMember[0].id);
      // emit member spawned
      this.dispatch(
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

  // member : moved

  onMemberMoved(member: Member, roundMember: RoundMembersArray[0]) {
    // disable gravity
    // memberMatter.setIgnoreGravity(true);
    member.moved(roundMember);
  }

  // round tick : members update

  onGameMembersUpdate() {
    this.roundMembersArray.forEach(roundMember => {
      const member = this.members.find(
        _member => _member.id === roundMember.id
      );

      if (!member) return;

      // if I'm not the member manager
      if (roundMember.manager && roundMember.manager !== this.playerId) {
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
    });
  }

  // ---------- RESTART ----------

  newRound() {
    // TODO: wip
    this.scene.restart();
  }

  // ---------- START ----------

  start() {
    // TODO
  }

  // ########## PHASER SCENE FUNCTIONS ##########

  preload() {
    this.loadMembers();
    this.loadPlatforms();
    this.loadTraps();
    this.loadShapes();
  }

  create() {
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
    }, 3000);

    this.events.on("destroy", () => {
      console.log("scene destroy");
      this.matterCollision.removeAllCollideListeners();
    });

    this.events.on("shutdown", () => {
      this.members = [];
      console.log("scene shutdown");
    });
  }

  update(time: number, delta: number) {
    this.roundMembersArray.forEach(roundMember => {
      // if I'm the member manager
      if (this.playerId === roundMember.manager) {
        const member = this.members.find(
          _member => _member.id === roundMember.id
        );
        const memberBody = member?.body as MatterJS.BodyType;
        if (member && memberBody) {
          // enable gravity
          // member.setIgnoreGravity(false);
          // emit normalized position and velocity of member
          this.dispatch(
            actions.webSocket.emit.round.memberMove({
              position: {
                x: memberBody.position.x / this.pixelRatio,
                y: memberBody.position.y / this.pixelRatio
              },
              velocity: {
                x: memberBody.velocity.x / this.pixelRatio,
                y: memberBody.velocity.y / this.pixelRatio
              },
              id: roundMember.id
            })
          );
        }
      }
    });
  }
}
