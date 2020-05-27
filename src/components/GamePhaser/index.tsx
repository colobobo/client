import React, { FC, useRef, useEffect, useCallback } from "react";
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

  // selectors

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectMinHeight);
  const gameObjectsArray = useSelector(selectors.round.selectObjectsAsArray);

  // functions

  const loadMembers = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    Object.values(members).forEach(member => {
      scene.load.svg(membersConfig[member]);
    });
  }, []);

  const addMembers = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    Object.values(members).forEach((member, i) => {
      scene.matter.add
        .image(i * 50, i * 50, member, undefined, {
          plugin: { wrap: utils.phaser.getGameWrapConfig($game.current!) },
          label: member
        })
        // scale
        .setScale(0.5)
        // fixe rotation
        .setFixedRotation();
    });
  }, []);

  const onGameObjectsUpdate = useCallback(
    (objects: typeof gameObjectsArray) => {
      // TODO: update object positions
    },
    [gameObjectsArray]
  );

  // ---- PHASER FUNCTIONS ----

  const preload = useCallback(() => {
    loadMembers();
  }, [loadMembers]);

  const create = useCallback(() => {
    const scene = $game.current!.scene.getScene(mainSceneKey);

    addMembers();

    // enable drag and drop
    scene.matter.add.mouseSpring({ stiffness: 0 });

    // listen drag start

    scene.matter.world.on("dragstart", (e: MatterJS.BodyType) => {
      console.log("dragstart ->", e.label);
    });
  }, [addMembers]);

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
          debug: {
            showBody: true,
            showStaticBody: true,
            showInternalEdges: true,
            showVelocity: true,
            showCollisions: true,
            lineThickness: 2,
            showPositions: true,
            positionSize: 6
          },

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
      scene: {
        key: mainSceneKey,
        preload,
        create
      }
    };

    $game.current = new Phaser.Game(gameConfig);
  }, [areaHeight, areaWidth, create, preload]);

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
