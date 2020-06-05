import React, {
  FC,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState
} from "react";
import * as Phaser from "phaser";
import * as utils from "../../utils";
import { selectors, actions } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { membersSkinConfig } from "../../datas/members";

import { enums } from "@colobobo/library";

import "./index.scss";

const mainSceneKey = "main-scene";

const GamePhaser: FC = () => {
  const dispatch = useDispatch();

  // SELECTORS

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectMinHeight);
  const gameMembersArray = useSelector(selectors.round.selectMembersAsArray);
  const deviceId = useSelector(selectors.room.selectDeviceId);
  const isRoundStarted = useSelector(selectors.round.selectIsStarted);

  // DOM REF

  const $parent = useRef<HTMLDivElement>(null);

  // PHASER REF

  const $game = useRef<Phaser.Game | null>(null);
  const $pointerContraint = useRef<Phaser.Physics.Matter.PointerConstraint | null>(
    null
  );
  const $membersMatter = useRef<Phaser.Physics.Matter.Image[]>([]);

  // OTHER REF

  const $gameMembersArray = useRef<typeof gameMembersArray>(gameMembersArray);

  // STATE

  const [isGameReady, setIsGameReady] = useState(false);

  // ########## FUNCTIONS ##########

  // ----- PRELOAD ----

  // load members

  const loadMembers = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    Object.values(enums.member.Skins).forEach(memberSkin => {
      scene.load.svg(membersSkinConfig[memberSkin]);
    });
  }, []);

  // ----- CREATE -----

  // add members to scene

  const addMembersToScene = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    $gameMembersArray.current.forEach((member, i) => {
      const memberMatter = scene.matter.add.image(
        50 + i * 70,
        120,
        member.skin,
        undefined,
        {
          plugin: { wrap: utils.phaser.getGameWrapConfig($game.current!) },
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
      memberMatter.setSensor(true);
      // sleep
      memberMatter.setToSleep();

      // add member matter object to members array
      $membersMatter.current.push(memberMatter);
    });
  }, []);

  // members event listeners

  const addMembersEventListeners = useCallback(() => {
    $membersMatter.current.forEach(member => {
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
  }, []);

  // matter world event listeners

  const addMatterWorldEventListeners = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    // listen drag start
    scene.matter.world.on("dragstart", (e: MatterJS.BodyType) => {
      const gameObject: Phaser.Physics.Matter.Image = e.gameObject;
      console.log("dragstart ->", gameObject.name);

      dispatch(
        actions.webSocket.emit.round.memberDragStart({
          playerId: deviceId,
          memberId: gameObject.name
        })
      );
    });
  }, [deviceId, dispatch]);

  // ---- UPDATE ----

  // round tick : members

  const onGameMembersUpdate = useCallback(
    (members: typeof gameMembersArray) => {
      members.forEach(member => {
        const memberMatter = $membersMatter.current.find(
          $memberMatter => $memberMatter.name === member.id
        );

        // if I'm not the member manager
        if (member.manager && member.manager !== deviceId) {
          // disable gravity
          memberMatter?.setIgnoreGravity(true);
          // update member position and velocity
          memberMatter?.setPosition(member.position.x, member.position.y);
          memberMatter?.setVelocity(member.velocity.x, member.velocity.y);
        }

        // if status are different
        if (memberMatter && member.status !== memberMatter.data.get("status")) {
          // waiting -> active : spawned
          if (
            memberMatter.data.get("status") === enums.member.Status.waiting &&
            member.status === enums.member.Status.active
          ) {
            memberMatter.setAwake();
            memberMatter.setAlpha(1);
            memberMatter.setSensor(false);
            memberMatter.data.set("status", enums.member.Status.active);
          }

          // active -> waiting : trapped
          if (
            memberMatter.data.get("status") === enums.member.Status.active &&
            member.status === enums.member.Status.waiting
          ) {
            const initialPosition = memberMatter.data.get("initialPosition");
            memberMatter.setAlpha(0.5);
            memberMatter.setSensor(true);
            memberMatter.setPosition(initialPosition.x, initialPosition.y);
            memberMatter.setToSleep();
            memberMatter.data.set("status", enums.member.Status.waiting);
          }

          // active -> arrived : trapped
          if (
            memberMatter.data.get("status") === enums.member.Status.active &&
            member.status === enums.member.Status.arrived
          ) {
            const initialPosition = memberMatter.data.get("initialPosition");
            memberMatter.setAlpha(0);
            memberMatter.setSensor(true);
            memberMatter.setPosition(initialPosition.x, initialPosition.y);
            memberMatter.setToSleep();
            memberMatter.data.set("status", enums.member.Status.arrived);
          }
        }
      });
    },
    [deviceId, gameMembersArray]
  );

  // ########## PHASER SCENE FUNCTIONS ##########

  // ---- PRELOAD ----

  const preload = useCallback(() => {
    loadMembers();
  }, [loadMembers]);

  // ---- CREATE ----

  const create = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    addMembersToScene();

    addMembersEventListeners();

    addMatterWorldEventListeners();

    // enable drag and drop in matter
    // @ts-ignore
    $pointerContraint.current = scene.matter.add.pointerConstraint({
      stiffness: 0
    });
  }, [
    addMatterWorldEventListeners,
    addMembersEventListeners,
    addMembersToScene
  ]);

  // ---- UPDATE ----

  const update = useCallback(
    (time, delta) => {
      $gameMembersArray.current.forEach(member => {
        // if I'm the member manager
        if (deviceId === member.manager) {
          const memberMatter = $membersMatter.current.find(
            $memberMatter => $memberMatter.name === member.id
          );
          const memberMatterBody = memberMatter?.body as MatterJS.BodyType;
          if (memberMatter && memberMatterBody) {
            // enable gravity
            memberMatter.setIgnoreGravity(false);
            // emit position and velocity of member
            dispatch(
              actions.webSocket.emit.round.memberMove({
                position: memberMatterBody.position,
                velocity: memberMatterBody.velocity,
                id: member.id
              })
            );
          }
        }
      });
    },
    [deviceId, dispatch]
  );

  // ---- MAIN SCENE ----

  const mainScene = useMemo<Phaser.Types.Scenes.CreateSceneFromObjectConfig>(
    () => ({
      key: mainSceneKey,
      preload,
      create
    }),
    [create, preload]
  );

  // ---- CREATE PHASER GAME ----

  const createGame = useCallback(() => {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: areaWidth,
      height: areaHeight,
      parent: $parent.current!,
      transparent: true,
      physics: {
        default: "matter",
        matter: {
          gravity: { y: 1 },
          debug:
            process.env.NODE_ENV === "development"
              ? {
                  showBody: true,
                  showStaticBody: true,
                  showInternalEdges: true,
                  showVelocity: true,
                  showCollisions: true,
                  lineThickness: 2,
                  showPositions: true,
                  positionSize: 6
                }
              : false,
          setBounds: {
            x: -300,
            left: false,
            right: false,
            width: areaWidth + 600,
            thickness: 100
          },
          "plugins.wrap": true
        }
      },
      scene: mainScene
    };

    $game.current = new Phaser.Game(gameConfig);

    $game.current.events.on(Phaser.Core.Events.READY, () => {
      setIsGameReady(true);
    });
  }, [areaHeight, areaWidth, mainScene]);

  //  ########## SIDE EFFECTS  ##########

  // on mount -> create game

  useEffect(() => {
    createGame();
  }, [createGame]);

  // on game created -> listen scene update

  useEffect(() => {
    if (isGameReady) {
      const scene = $game.current!.scene.getScene(mainSceneKey);
      scene.events.addListener(Phaser.Scenes.Events.UPDATE, update);

      return () => {
        scene.events.removeListener(Phaser.Scenes.Events.UPDATE, update);
      };
    }
  }, [isGameReady, update]);

  // listen isRoundStarted -> wake or sleep scene

  useEffect(() => {
    if (isGameReady) {
      const scene = $game.current!.scene.getScene(mainSceneKey);
      isRoundStarted ? scene.matter.resume() : scene.matter.pause();
      // isRoundStarted
    }
  }, [isGameReady, isRoundStarted]);

  // listen game objects update

  useEffect(() => {
    onGameMembersUpdate(gameMembersArray);
  }, [gameMembersArray, onGameMembersUpdate]);

  // update $gameMembersArray ref with gameMembersArray from store

  useEffect(() => {
    $gameMembersArray.current = gameMembersArray;
  }, [gameMembersArray]);

  // on unmount : stop game

  useEffect(() => {
    return () => {
      dispatch(actions.round.stop());
    };
  }, [dispatch]);

  // return

  return <div className="game-phaser" ref={$parent} />;
};

export default GamePhaser;
