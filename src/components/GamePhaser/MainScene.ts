import * as Phaser from "phaser";
import { enums } from "@colobobo/library";
import { membersSkinConfig } from "../../datas/members";
import { actions, selectors } from "../../redux";
import { Dispatch } from "redux";
import * as utils from "../../utils";

type GameMembersArray = ReturnType<typeof selectors.round.selectMembersAsArray>;

export default class MainScene extends Phaser.Scene {
  dispatch: Dispatch;
  playerId: string;
  gameMembersArray: GameMembersArray;
  isRoundStarted: boolean;

  pointerContraint: Phaser.Physics.Matter.PointerConstraint | null = null;
  membersMatter: Phaser.Physics.Matter.Image[] = [];
  constructor({
    dispatch,
    gameMembersArray,
    playerId,
    isRoundStarted
  }: {
    dispatch: Dispatch;
    playerId: string;
    gameMembersArray: GameMembersArray;
    isRoundStarted: boolean;
  }) {
    super({ key: "main-scene" });

    this.dispatch = dispatch;
    this.playerId = playerId;
    this.gameMembersArray = gameMembersArray;
    this.isRoundStarted = isRoundStarted;
  }

  // SETTERS

  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  setPlayerId(playerId: string) {
    this.playerId = playerId;
  }

  setGameMembersArray(gameMembersArray: GameMembersArray) {
    this.gameMembersArray = gameMembersArray;
    this.onGameMembersUpdate();
  }

  // ########## FUNCTIONS ##########

  // ---------- PRELOAD ----------

  // load members

  loadMembers() {
    Object.values(enums.member.Skins).forEach(memberSkin => {
      this.load.svg(membersSkinConfig[memberSkin]);
    });
  }

  // ---------- CREATE ----------

  // add members to scene

  addMembersToScene() {
    this.gameMembersArray.forEach((member, i) => {
      const memberMatter = this.matter.add.image(
        50 + i * 70,
        120,
        member.skin,
        undefined,
        {
          plugin: { wrap: utils.phaser.getGameWrapConfig(this.game) },
          label: member.id
        }
      );
      // set name
      memberMatter.setName(member.id);
      // scale
      memberMatter.setScale(0.5);
      // alpha
      memberMatter.setAlpha(0.5);
      // fixe rotation
      memberMatter.setFixedRotation();
      // status = waiting
      memberMatter.setData("status", enums.member.Status.waiting);
      // save initial position
      memberMatter.setData("initialPosition", {
        x: memberMatter.x,
        y: memberMatter.y
      });
      // disable collision
      // TODO: use : .setCollisionCategory
      memberMatter.setSensor(true);
      // sleep
      memberMatter.setToSleep();

      // add member matter object to members array
      this.membersMatter.push(memberMatter);
    });
  }

  // members event listeners

  addMembersEventListeners() {
    this.membersMatter.forEach(member => {
      // listen pointer events
      member.setInteractive().on("pointerdown", (e: Phaser.Input.Pointer) => {
        console.log("pointerdown ->", member.name);
      });

      // listen collision
      // TODO : use https://github.com/mikewesthad/phaser-matter-collision-plugin
      member.setOnCollide((e: any) => {
        // console.log("collide", e);
      });
    });
  }

  // matter world event listeners

  addMatterWorldEventListeners() {
    // listen drag start
    this.matter.world.on("dragstart", (e: MatterJS.BodyType) => {
      const gameObject: Phaser.Physics.Matter.Image = e.gameObject;
      console.log("dragstart ->", gameObject.name);

      this.dispatch(
        actions.webSocket.emit.round.memberDragStart({
          playerId: this.playerId,
          memberId: gameObject.name
        })
      );
    });
  }

  // ---------- UPDATE ----------

  // member : spawned

  onMemberSpawned(memberMatter: Phaser.Physics.Matter.Image) {
    memberMatter.setAwake();
    memberMatter.setAlpha(1);
    memberMatter.setSensor(false);
    memberMatter.data.set("status", enums.member.Status.active);
  }

  // member : trapped

  onMemberTrapped(memberMatter: Phaser.Physics.Matter.Image) {
    const initialPosition = memberMatter.data.get("initialPosition");
    memberMatter.setAlpha(0.5);
    memberMatter.setSensor(true);
    memberMatter.setPosition(initialPosition.x, initialPosition.y);
    memberMatter.setToSleep();
    memberMatter.data.set("status", enums.member.Status.waiting);
  }

  // member : arrived

  onMemberArrived(memberMatter: Phaser.Physics.Matter.Image) {
    const initialPosition = memberMatter.data.get("initialPosition");
    memberMatter.setAlpha(0);
    memberMatter.setSensor(true);
    memberMatter.setPosition(initialPosition.x, initialPosition.y);
    memberMatter.setToSleep();
    memberMatter.data.set("status", enums.member.Status.arrived);
  }

  // member : moved

  onMemberMoved(
    memberMatter: Phaser.Physics.Matter.Image,
    member: GameMembersArray[0]
  ) {
    // disable gravity
    memberMatter.setIgnoreGravity(true);
    // update member position and velocity
    memberMatter.setPosition(member.position.x, member.position.y);
    memberMatter.setVelocity(member.velocity.x, member.velocity.y);
  }

  // round tick : members update

  onGameMembersUpdate() {
    this.gameMembersArray.forEach(member => {
      const memberMatter = this.membersMatter.find(
        _memberMatter => _memberMatter.name === member.id
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

  // ########## PHASER SCENE FUNCTIONS ##########

  preload() {
    this.loadMembers();
  }

  create() {
    this.addMembersToScene();

    this.addMembersEventListeners();

    this.addMatterWorldEventListeners();

    // enable drag and drop in matter
    // @ts-ignore
    this.pointerContraint = this.matter.add.pointerConstraint({
      stiffness: 0
    });
  }

  update(time: number, delta: number) {
    this.gameMembersArray.forEach(member => {
      // if I'm the member manager
      if (this.playerId === member.manager) {
        const memberMatter = this.membersMatter.find(
          _memberMatter => _memberMatter.name === member.id
        );
        const memberMatterBody = memberMatter?.body as MatterJS.BodyType;
        if (memberMatter && memberMatterBody) {
          // enable gravity
          memberMatter.setIgnoreGravity(false);
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
