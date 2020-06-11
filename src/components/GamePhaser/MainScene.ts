import * as Phaser from "phaser";
import { enums } from "@colobobo/library";
import * as config from "../../config";
import { actions, selectors } from "../../redux";
import { Dispatch } from "redux";
import * as utils from "../../utils";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Member from "./Member";

type RoundMembersArray = ReturnType<
  typeof selectors.round.selectMembersAsArray
>;
type PlayersRole = ReturnType<typeof selectors.round.selectPlayersRole>;
type AreaDevices = ReturnType<typeof selectors.area.selectDevices>;

enum CollisionCategories {
  default = "default",
  member = "member",
  platform = "platform",
  wall = "wall"
}

export default class MainScene extends Phaser.Scene {
  // scene plugin
  matterCollision: typeof PhaserMatterCollisionPlugin;

  // data from redux store
  dispatch: Dispatch;
  playerId: string;
  roundMembersArray: RoundMembersArray;
  isRoundStarted: boolean;
  world: enums.World;
  playersRole: PlayersRole;
  areaDevices: AreaDevices;

  // scene variables
  collisionCategories: { [key in CollisionCategories]: number } = {
    [CollisionCategories.default]: 1,
    [CollisionCategories.member]: 0,
    [CollisionCategories.platform]: 0,
    [CollisionCategories.wall]: 0
  };
  pointerContraint: Phaser.Physics.Matter.PointerConstraint | null = null;
  members: Member[] = [];
  plateforms: {
    start: Phaser.Physics.Matter.Image | null;
    finish: Phaser.Physics.Matter.Image | null;
  } = { start: null, finish: null };

  constructor({
    dispatch,
    world,
    playerId,
    playersRole,
    areaDevices,
    roundMembersArray,
    isRoundStarted
  }: {
    dispatch: Dispatch;
    world: enums.World;
    playerId: string;
    playersRole: PlayersRole;
    areaDevices: AreaDevices;
    roundMembersArray: RoundMembersArray;
    isRoundStarted: boolean;
  }) {
    super({ key: "main-scene" });

    this.dispatch = dispatch;
    this.playerId = playerId;
    this.roundMembersArray = roundMembersArray;
    this.isRoundStarted = isRoundStarted;
    this.world = world;
    this.playersRole = playersRole;
    this.areaDevices = areaDevices;
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
    Object.values(enums.World).forEach(world => {
      // load left platform
      this.load.svg(config.worlds[world].platforms.left);
      // load right platform
      this.load.svg(config.worlds[world].platforms.right);
      // load wall
      this.load.svg(config.worlds[world].platforms.wall);
    });
  }

  // GETTERS

  getPlayerWithPlatformRole(): string | null {
    let playerWithPlatformRole = null;
    Object.keys(this.playersRole).forEach(playerId => {
      if (this.playersRole[playerId].role === enums.player.Role.platform) {
        playerWithPlatformRole = playerId;
      }
    });
    return playerWithPlatformRole;
  }

  getPlayersWithTrapRole(): string[] {
    return Object.keys(this.playersRole).filter(
      playerId => this.playersRole[playerId].role === enums.player.Role.trap
    );
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
          frictionStatic: 0.05,
          frictionAir: 0.02,
          ignoreGravity: true
        },
        id: roundMember.id
      });

      // scale
      member.setScale(0.42);
      // position
      member.setX(this.plateforms.start!.x);
      member.setY(
        this.plateforms.start!.y -
          this.plateforms.start!.displayHeight / 2 -
          member.displayHeight / 2
      );
      // alpha
      member.setAlpha(0);
      // fixed rotation
      member.setFixedRotation();
      // disbale intercation
      member.disableInteractive();
      // set status
      member.status = enums.member.Status.waiting;
      // set collision category
      member.setCollisionCategory(
        this.collisionCategories[CollisionCategories.member]
      );
      // disable collision
      member.setCollidesWith(0);

      // add member matter object to members array
      this.members.push(member);
    });
  }

  // members event listeners

  addMembersEventListeners() {
    this.members.forEach(member => {
      // listen pointer events
      // member.setInteractive().on("pointerdown", (e: Phaser.Input.Pointer) => {
      //   console.log("pointerdown ->", member.name);
      // });
      // listen collision
      // TODO : use https://github.com/mikewesthad/phaser-matter-collision-plugin
      // member.setOnCollide((e: any) => {
      //   // console.log("collide", e);
      // });
    });
  }

  createPlatformsAndWall() {
    const playerWithPlatformRole = this.getPlayerWithPlatformRole();

    if (playerWithPlatformRole) {
      const device = this.areaDevices[playerWithPlatformRole];

      // PLATFORMS

      const leftPlatform = this.matter.add
        .image(
          device.offsetX + device.width * 0.2,
          0,
          config.worlds[this.world].platforms.left.key,
          undefined,
          {
            isStatic: true
          }
        )
        .setScale(0.3);

      const rightPlatform = this.matter.add
        .image(
          device.offsetX + device.width * 0.8,
          0,
          config.worlds[this.world].platforms.right.key,
          undefined,
          {
            isStatic: true
          }
        )
        .setScale(0.3);

      // set y
      leftPlatform.setY(
        this.game.canvas.height - leftPlatform.displayHeight / 2
      );
      rightPlatform.setY(
        this.game.canvas.height - rightPlatform.displayHeight / 2
      );

      // TODO: dynamic
      this.plateforms.start = rightPlatform;
      this.plateforms.finish = leftPlatform;

      // WALL

      const wall = this.matter.add
        .image(
          device.offsetX + device.width * 0.5,
          0,
          config.worlds[this.world].platforms.wall.key,
          undefined,
          {
            isStatic: true,
            frictionStatic: 0,
            friction: 0
          }
        )
        .setScale(0.3);

      // set y
      wall.setY(wall.y + wall.displayHeight / 2);

      // START SENSOR

      const startSensor = this.matter.add.gameObject(
        this.add.rectangle(
          this.plateforms.start.x,
          this.plateforms.start.y -
            this.plateforms.start.displayHeight / 2 -
            100,
          this.plateforms.start.displayWidth + 50,
          200
        ),
        {
          isSensor: true,
          isStatic: true,
          ignorePointer: true
        }
      );

      this.matterCollision.addOnCollideActive({
        objectA: startSensor,
        callback: (e: any) => {
          const { gameObjectB } = e;
          // if collide with member
          if (gameObjectB instanceof Member) {
            startSensor.setData("isColliding", true);
          }
        }
      });

      // listen collisions end
      this.matterCollision.addOnCollideEnd({
        objectA: startSensor,
        callback: (e: any) => {
          const { gameObjectB } = e;
          // if collide with member
          if (gameObjectB instanceof Member) {
            startSensor.setData("isColliding", false);
            // wait 0.5 second
            setTimeout(() => {
              // if sensor not colliding currently : new member spawn
              if (!startSensor.getData("isColliding")) this.newMemberSpawn();
            }, 500);
          }
        }
      });

      // FINISH SENSOR

      const finishSensor = this.matter.add.rectangle(
        this.plateforms.finish.x,
        this.plateforms.finish.y - this.plateforms.finish.displayHeight / 2 - 5,
        this.plateforms.finish.displayWidth / 4,
        10,
        {
          isSensor: true,
          isStatic: true,
          ignorePointer: true
        }
      );

      // listen collision start
      this.matterCollision.addOnCollideStart({
        objectA: finishSensor,
        callback: (e: any) => {
          const { gameObjectB } = e;
          // if collide with member and my role is plateforms
          if (
            gameObjectB instanceof Member &&
            this.playerId === this.getPlayerWithPlatformRole()
          ) {
            // emit member arrived
            this.dispatch(
              actions.webSocket.emit.round.memberArrived({
                memberId: gameObjectB.id
              })
            );
          }
        }
      });
    }
  }

  createTraps() {
    const playersWithTrapRole = this.getPlayersWithTrapRole();

    playersWithTrapRole.forEach(playerId => {
      const playerRole = this.playersRole[playerId];
      const device = this.areaDevices[playerId];

      const trap = this.matter.add.gameObject(
        this.add.rectangle(
          device.offsetX + device.width * 0.5,
          0,
          40,
          this.game.canvas.height * 0.3,
          0xff0000
        ),
        {
          isStatic: true
        }
      ) as Phaser.GameObjects.Rectangle;

      trap.setY(trap.y + trap.displayHeight / 2);

      // listen collision start
      this.matterCollision.addOnCollideStart({
        objectA: trap,
        callback: (e: any) => {
          const { gameObjectB } = e;
          console.log("trap collision");
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
    const waitingMember = this.roundMembersArray.filter(
      roundMember => roundMember.status === enums.member.Status.waiting
    );
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

    member.setX(this.plateforms.start!.x);
    member.setY(
      this.plateforms.start!.y -
        this.plateforms.start!.displayHeight / 2 -
        (member.height * 0.42) / 2
    );
    member.setFixedRotation();
    member.status = enums.member.Status.active;
    // member.data.set("status", enums.member.Status.active);

    // animate
    this.tweens.add({
      alpha: 1,
      targets: member,
      scale: { from: 0.2, to: 0.42 },
      ease: "Sine.easeOut",
      duration: 600,
      onComplete: () => {
        member.setCollidesWith([
          this.collisionCategories[CollisionCategories.default],
          this.collisionCategories[CollisionCategories.member],
          this.collisionCategories[CollisionCategories.platform],
          this.collisionCategories[CollisionCategories.wall]
        ]);
        member.setIgnoreGravity(false);
        member.setInteractive();
      }
    });
  }

  // member : trapped

  onMemberTrapped(member: Member) {
    console.log("on member trapped");

    member.setVelocity(0);
    member.setIgnoreGravity(true);
    member.setCollidesWith(0);
    member.disableInteractive();
    member.status = enums.member.Status.waiting;
    // member.data.set("status", enums.member.Status.waiting);

    // animate
    this.tweens.add({
      targets: member,
      alpha: 0,
      scale: 0.2,
      duration: 400,
      ease: "Sine.easeIn"
    });

    const waitingMember = this.roundMembersArray.filter(
      roundMember => roundMember.status === enums.member.Status.waiting
    );
    // TODO: refacto
    if (waitingMember.length === 1) {
      setTimeout(() => {
        this.newMemberSpawn();
      }, 800);
    }
  }

  // member : arrived

  onMemberArrived(member: Member) {
    console.log("on member arrived");
    member.disableInteractive();
    member.setCollidesWith(0);
    member.setIgnoreGravity(true);
    member.setVelocity(0);
    member.status = enums.member.Status.arrived;
    // member.data.set("status", enums.member.Status.arrived);

    // animate
    this.tweens.add({
      targets: member,
      alpha: 0,
      x: this.plateforms.finish?.x,
      y:
        this.plateforms.finish!.y -
        this.plateforms.finish!.displayHeight / 2 -
        member.displayHeight / 2,
      scale: 0.2,
      duration: 600,
      ease: "Sine.easeIn"
    });
  }

  // member : moved

  onMemberMoved(
    memberMatter: Phaser.Physics.Matter.Image,
    roundMember: RoundMembersArray[0]
  ) {
    // disable gravity
    // memberMatter.setIgnoreGravity(true);
    // update member position and velocity
    memberMatter.setPosition(roundMember.position.x, roundMember.position.y);
    memberMatter.setVelocity(roundMember.velocity.x, roundMember.velocity.y);
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

  // ########## PHASER SCENE FUNCTIONS ##########

  preload() {
    this.loadMembers();
    this.loadPlatforms();
  }

  create() {
    this.createCollisionCategories();

    this.createFloor();

    this.createPlatformsAndWall();

    this.createTraps();

    this.createMembers();
    this.addMembersEventListeners();

    this.addMatterWorldEventListeners();

    // enable drag and drop in matter
    // @ts-ignore
    this.pointerContraint = this.matter.add.pointerConstraint({
      stiffness: 0.15,
      render: {
        visible: true
      }
    });

    this.newMemberSpawn();

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
          // emit position and velocity of member
          this.dispatch(
            actions.webSocket.emit.round.memberMove({
              position: memberBody.position,
              velocity: memberBody.velocity,
              id: roundMember.id
            })
          );
        }
      }
    });
  }
}
