import React, { FC, useRef, useEffect, useCallback, useMemo } from "react";
import "./index.scss";

import * as Phaser from "phaser";

import { selectors } from "../../redux";
import { useSelector } from "react-redux";
import { membersConfig, members } from "../../datas/members";

const GamePhaser: FC = () => {
  // ref

  const $parent = useRef<HTMLDivElement>(null);
  const $game = useRef<Phaser.Game | null>(null);

  // selectors

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectHeight);

  // functions

  const getWrapConfig = useCallback(
    (game: Phaser.Game) => ({
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: game.canvas.width,
        y: game.canvas.height
      }
    }),
    []
  );

  const preload = useCallback(() => {
    const scene = $game.current!.scene.getScene("main-scene");

    Object.values(members).forEach(member => {
      scene.load.svg(membersConfig[member]);
    });
  }, []);

  const create = useCallback(() => {
    const scene = $game.current!.scene.getScene("main-scene");

    Object.values(members).forEach((member, i) => {
      scene.matter.add
        .image(i * 50, i * 20, member, undefined, {
          plugin: { wrap: getWrapConfig($game.current!) }
        })
        .setScale(0.5);
      // .setFixedRotation();
    });

    scene.matter.add.pointerConstraint({ stiffness: 0 });
  }, [getWrapConfig]);

  // effects

  useEffect(() => {
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
          debug: {},

          setBounds: {
            x: -300,
            left: false,
            right: false,
            width: areaWidth + 600,
            thickness: 1
          },
          "plugins.wrap": true
        }
      },
      scene: {
        key: "main-scene",
        preload,
        create
      }
    };

    $game.current = new Phaser.Game(gameConfig);
  }, [areaHeight, areaWidth, create, preload]);

  // return

  return <div className="game-phaser" ref={$parent} />;
};

export default GamePhaser;
