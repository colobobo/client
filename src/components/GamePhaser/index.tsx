import React, { FC, useRef, useEffect, useCallback, useMemo } from "react";
import * as Phaser from "phaser";
import * as utils from "../../utils";
import { selectors } from "../../redux";
import { useSelector } from "react-redux";
import { membersConfig, members } from "../../datas/members";

import "./index.scss";

const mainSceneKey = "main-scene";

const GamePhaser: FC = () => {
  // ref

  const $parent = useRef<HTMLDivElement>(null);
  const $game = useRef<Phaser.Game | null>(null);
  const $membersMatter = useRef<Phaser.Physics.Matter.Image[]>([]);
  const $pointerContraint = useRef<Phaser.Physics.Matter.PointerConstraint | null>(
    null
  );

  // selectors

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectMinHeight);
  const gameObjectsArray = useSelector(selectors.round.selectObjectsAsArray);

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
      // gameObject.setScale(gameObject.scale + 0.1);
    });
  }, []);

  const onGameObjectsUpdate = useCallback(
    (objects: typeof gameObjectsArray) => {
      // TODO: update object positions
    },
    [gameObjectsArray]
  );

  // ----- PHASER FUNCTIONS -----

  // preload

  const preload = useCallback(() => {
    loadMembers();
  }, [loadMembers]);

  // create

  const create = useCallback(() => {
    addMembersToScene();

    addMembersEventListeners();

    addMatterWorldEventListeners();

    const scene = $game.current!.scene.getScene(mainSceneKey);

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

  // phaser main scene

  const mainScene = useMemo(
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
  }, [areaHeight, areaWidth, mainScene]);

  // EFFECTS

  // create game on mount

  useEffect(() => {
    createGame();
  }, [createGame]);

  // listen game objects update

  useEffect(() => {
    onGameObjectsUpdate(gameObjectsArray);
  }, [gameObjectsArray, onGameObjectsUpdate]);

  // return

  return <div className="game-phaser" ref={$parent} />;
};

export default GamePhaser;
