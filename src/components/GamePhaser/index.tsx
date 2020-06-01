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
import { membersConfig, members } from "../../datas/members";

import "./index.scss";

const mainSceneKey = "main-scene";

const GamePhaser: FC = () => {
  const dispatch = useDispatch();

  // selectors

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectMinHeight);
  const gameMembersArray = useSelector(selectors.round.selectMembersAsArray);
  const deviceId = useSelector(selectors.room.selectDeviceId);
  const isRoundStarted = useSelector(selectors.round.selectIsStarted);

  // ref

  const $parent = useRef<HTMLDivElement>(null);
  const $game = useRef<Phaser.Game | null>(null);
  const $membersMatter = useRef<Phaser.Physics.Matter.Image[]>([]);
  const $pointerContraint = useRef<Phaser.Physics.Matter.PointerConstraint | null>(
    null
  );
  const $gameMembersArray = useRef<typeof gameMembersArray>([]);

  // state

  const [isGameReady, setIsGameReady] = useState(false);

  // FUNCTIONS

  // load members

  const loadMembers = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    Object.values(members).forEach(member => {
      scene.load.svg(membersConfig[member]);
    });
  }, []);

  // add members to scene

  const addMembersToScene = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    Object.values(members).forEach((member, i) => {
      const memberMatter = scene.matter.add.image(
        i * 50,
        i * 50,
        member,
        undefined,
        {
          plugin: { wrap: utils.phaser.getGameWrapConfig($game.current!) },
          label: member
        }
      );
      // set name
      memberMatter.setName(member);
      // scale
      memberMatter.setScale(0.5);
      // fixe rotation
      memberMatter.setFixedRotation();

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

  const onGameMembersUpdate = useCallback(
    (members: typeof gameMembersArray) => {
      members.forEach(member => {
        // update member position and velocity if I'm not the member manager
        if (member.manager !== "" && member.manager !== deviceId) {
          $membersMatter.current
            .find($memberMatter => $memberMatter.name === member.id)
            ?.setPosition(member.position.x, member.position.y)
            ?.setVelocity(member.velocity.x, member.velocity.y);
        }
      });
    },
    [deviceId, gameMembersArray]
  );

  // ----- PHASER SCENE FUNCTIONS -----

  // preload

  const preload = useCallback(() => {
    loadMembers();
  }, [loadMembers]);

  // create

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

  // update

  const update = useCallback(
    (time, delta) => {
      $gameMembersArray.current.forEach(member => {
        // if I'm the member manager
        if (deviceId === member.manager) {
          const memberMatterBody = $membersMatter.current.find(
            $memberMatter => $memberMatter.name === member.id
          )?.body as MatterJS.BodyType;
          if (memberMatterBody) {
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

  // phaser main scene

  const mainScene = useMemo<Phaser.Types.Scenes.CreateSceneFromObjectConfig>(
    () => ({
      key: mainSceneKey,
      preload,
      create
    }),
    [create, preload]
  );

  // create phaser game

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

  // EFFECTS

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
      isRoundStarted
        ? $game.current!.scene.wake(mainSceneKey)
        : $game.current!.scene.sleep(mainSceneKey);
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
  }, []);

  // return

  return <div className="game-phaser" ref={$parent} />;
};

export default GamePhaser;
