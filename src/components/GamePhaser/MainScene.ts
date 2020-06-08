import * as Phaser from "phaser";
import { enums } from "@colobobo/library";
import * as config from "../../config";
import { actions, selectors } from "../../redux";
import { Dispatch } from "redux";
import * as utils from "../../utils";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

type GameMembersArray = ReturnType<typeof selectors.round.selectMembersAsArray>;
type PlayersRole = ReturnType<typeof selectors.round.selectPlayersRole>;
type AreaDevices = ReturnType<typeof selectors.area.selectDevices>;

enum CollisionCategories {
  default = "default",
  member = "member",
  platform = "platform",
  wall = "wall"
}

export default class MainScene extends Phaser.Scene {
  matterCollision: typeof PhaserMatterCollisionPlugin;

  dispatch: Dispatch;
  playerId: string;
  roundMembersArray: GameMembersArray;
  isRoundStarted: boolean;
  world: enums.World;
  playersRole: PlayersRole;
  areaDevices: AreaDevices;

  collisionCategories: { [key in CollisionCategories]: number } = {
    [CollisionCategories.default]: 1,
    [CollisionCategories.member]: 0,
    [CollisionCategories.platform]: 0,
    [CollisionCategories.wall]: 0
  };
  pointerContraint: Phaser.Physics.Matter.PointerConstraint | null = null;
  membersMatter: Phaser.Physics.Matter.Image[] = [];
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
    gameMembersArray,
    isRoundStarted
  }: {
    dispatch: Dispatch;
    world: enums.World;
    playerId: string;
    playersRole: PlayersRole;
    areaDevices: AreaDevices;
    gameMembersArray: GameMembersArray;
    isRoundStarted: boolean;
  }) {
    super({ key: "main-scene" });

    this.dispatch = dispatch;
    this.playerId = playerId;
    this.roundMembersArray = gameMembersArray;
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

  setGameMembersArray(gameMembersArray: GameMembersArray) {
    this.roundMembersArray = gameMembersArray;
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
        if (gameObjectB.getData("type") === "member") {
          const roundMember = this.roundMembersArray.find(
            member => member.id === gameObjectB.getData("id")
          );
          // if i'm the player manager
          if (this.playerId === roundMember?.manager) {
            // emit member arrived

            this.dispatch(
              actions.webSocket.emit.round.memberTrapped({
                memberId: gameObjectB.getData("id")
              })
            );
          }
        }
      }
    });
  }

  // create members and add to scene

  createMembers() {
    this.roundMembersArray.forEach((member, i) => {
      const memberMatter = this.matter.add.image(
        0,
        0,
        config.members[member.skin].skin.key,
        undefined,
        {
          plugin: { wrap: utils.phaser.getGameWrapConfig(this.game) },
          label: member.id,
          restitution: 0,
          friction: 0.002,
          frictionStatic: 0.05,
          frictionAir: 0.02,
          ignoreGravity: true
        }
      );
      // scale
      memberMatter.setScale(0.42);
      // position
      memberMatter.setX(this.plateforms.start!.x);
      memberMatter.setY(
        this.plateforms.start!.y -
          this.plateforms.start!.displayHeight / 2 -
          memberMatter.displayHeight / 2
      );
      // alpha
      memberMatter.setAlpha(0);
      // fixe rotation
      memberMatter.setFixedRotation();
      // disbale intercation
      memberMatter.disableInteractive();
      // set data
      memberMatter.setData("type", "member");
      memberMatter.setData("id", member.id);
      memberMatter.setData("status", enums.member.Status.waiting);
      memberMatter.setData("initialPosition", {
        x: memberMatter.x,
        y: memberMatter.y
      });
      // set collision category
      memberMatter.setCollisionCategory(
        this.collisionCategories[CollisionCategories.member]
      );
      // disbale collision
      memberMatter.setCollidesWith(0);

      // add member matter object to members array
      this.membersMatter.push(memberMatter);
    });
  }

  // members event listeners

  addMembersEventListeners() {
    this.membersMatter.forEach(member => {
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
          if (gameObjectB.getData("type") === "member") {
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
          if (gameObjectB.getData("type") === "member") {
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
            gameObjectB.getData("type") === "member" &&
            this.playerId === this.getPlayerWithPlatformRole()
          ) {
            // emit member arrived
            this.dispatch(
              actions.webSocket.emit.round.memberArrived({
                memberId: gameObjectB.getData("id")
              })
            );
          }
        }
      });
    }
  }

  createTraps() {
    const playersWithTrapRole = this.getPlayersWithTrapRole();

    console.log(playersWithTrapRole);

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
          if (gameObjectB.getData("type") === "member") {
            const roundMember = this.roundMembersArray.find(
              member => member.id === gameObjectB.getData("id")
            );
            // if i'm the player manager
            if (this.playerId === roundMember?.manager) {
              // emit member arrived

              this.dispatch(
                actions.webSocket.emit.round.memberTrapped({
                  memberId: gameObjectB.getData("id")
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
    this.matter.world.on("dragstart", (e: MatterJS.BodyType) => {
      const gameObject: Phaser.Physics.Matter.Image = e.gameObject;
      console.log("dragstart ->", gameObject?.getData("id"));

      if (gameObject?.getData("type") === "member")
        this.dispatch(
          actions.webSocket.emit.round.memberDragStart({
            playerId: this.playerId,
            memberId: gameObject.getData("id")
          })
        );
    });
  }

  // ---------- UPDATE ----------

  newMemberSpawn() {
    const waitingMember = this.roundMembersArray.filter(
      member => member.status === enums.member.Status.waiting
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

  onMemberSpawned(memberMatter: Phaser.Physics.Matter.Image) {
    console.log("on member spawned", memberMatter.getData("id"));

    memberMatter.setX(this.plateforms.start!.x);
    memberMatter.setY(
      this.plateforms.start!.y -
        this.plateforms.start!.displayHeight / 2 -
        (memberMatter.height * 0.42) / 2
    );
    memberMatter.setFixedRotation();
    memberMatter.data.set("status", enums.member.Status.active);

    // animate
    this.tweens.add({
      alpha: 1,
      targets: memberMatter,
      scale: { from: 0.2, to: 0.42 },
      ease: "Sine.easeOut",
      duration: 600,
      onComplete: () => {
        memberMatter.setCollidesWith([
          this.collisionCategories[CollisionCategories.default],
          this.collisionCategories[CollisionCategories.member],
          this.collisionCategories[CollisionCategories.platform],
          this.collisionCategories[CollisionCategories.wall]
        ]);
        memberMatter.setIgnoreGravity(false);
        memberMatter.setInteractive();
      }
    });
  }

  // member : trapped

  onMemberTrapped(memberMatter: Phaser.Physics.Matter.Image) {
    console.log("on member trapped");

    memberMatter.setVelocity(0);
    memberMatter.setIgnoreGravity(true);
    memberMatter.setCollidesWith(0);
    memberMatter.disableInteractive();
    memberMatter.data.set("status", enums.member.Status.waiting);

    // animate
    this.tweens.add({
      targets: memberMatter,
      alpha: 0,
      scale: 0.2,
      duration: 400,
      ease: "Sine.easeIn"
    });

    const waitingMember = this.roundMembersArray.filter(
      member => member.status === enums.member.Status.waiting
    );
    // TODO: refacto
    if (waitingMember.length === 1) {
      setTimeout(() => {
        this.newMemberSpawn();
      }, 800);
    }
    console.log(waitingMember);
  }

  // member : arrived

  onMemberArrived(memberMatter: Phaser.Physics.Matter.Image) {
    console.log("on member arrived");
    memberMatter.disableInteractive();
    memberMatter.setCollidesWith(0);
    memberMatter.setIgnoreGravity(true);
    memberMatter.setVelocity(0);
    memberMatter.data.set("status", enums.member.Status.arrived);

    // animate
    this.tweens.add({
      targets: memberMatter,
      alpha: 0,
      x: this.plateforms.finish?.x,
      y:
        this.plateforms.finish!.y -
        this.plateforms.finish!.displayHeight / 2 -
        memberMatter.displayHeight / 2,
      scale: 0.2,
      duration: 600,
      ease: "Sine.easeIn"
    });
  }

  // member : moved

  onMemberMoved(
    memberMatter: Phaser.Physics.Matter.Image,
    member: GameMembersArray[0]
  ) {
    // disable gravity
    // memberMatter.setIgnoreGravity(true);
    // update member position and velocity
    memberMatter.setPosition(member.position.x, member.position.y);
    memberMatter.setVelocity(member.velocity.x, member.velocity.y);
  }

  // round tick : members update

  onGameMembersUpdate() {
    this.roundMembersArray.forEach(member => {
      const memberMatter = this.membersMatter.find(
        _memberMatter => _memberMatter.getData("id") === member.id
      );

      // if I'm not the member manager
      if (memberMatter && member.manager && member.manager !== this.playerId) {
        // move member
        this.onMemberMoved(memberMatter, member);
      }

      const memberMatterStatus = memberMatter?.data.get("status");

      // if status are different
      if (memberMatter && member.status !== memberMatterStatus) {
        // waiting -> active : member spawned
        if (
          memberMatterStatus === enums.member.Status.waiting &&
          member.status === enums.member.Status.active
        ) {
          this.onMemberSpawned(memberMatter);
        }

        // active -> waiting : member trapped
        if (
          memberMatterStatus === enums.member.Status.active &&
          member.status === enums.member.Status.waiting
        ) {
          this.onMemberTrapped(memberMatter);
        }

        // active -> arrived : member arrived
        if (
          memberMatterStatus === enums.member.Status.active &&
          member.status === enums.member.Status.arrived
        ) {
          this.onMemberArrived(memberMatter);
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
      stiffness: 0
    });

    this.newMemberSpawn();

    this.events.on("destroy", () => {
      console.log("scene destroy");
      this.matterCollision.removeAllCollideListeners();
    });

    this.events.on("shutdown", () => {
      console.log("scene shutdown");
    });
  }

  update(time: number, delta: number) {
    this.roundMembersArray.forEach(member => {
      // if I'm the member manager
      if (this.playerId === member.manager) {
        const memberMatter = this.membersMatter.find(
          _memberMatter => _memberMatter.getData("id") === member.id
        );
        const memberMatterBody = memberMatter?.body as MatterJS.BodyType;
        if (memberMatter && memberMatterBody) {
          // enable gravity
          // memberMatter.setIgnoreGravity(false);
          // emit position and velocity of member
          this.dispatch(
            actions.webSocket.emit.round.memberMove({
              position: memberMatterBody.position,
              velocity: memberMatterBody.velocity,
              id: member.id
            })
          );
        }
      }
    });
  }
}
