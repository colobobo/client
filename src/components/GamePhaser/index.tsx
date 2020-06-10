import React, { FC, useRef, useEffect, useCallback, useState } from "react";
import * as Phaser from "phaser";
import { selectors } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

import "./index.scss";

import MainScene from "./MainScene";

interface Props {
  isActive: boolean;
}

const GamePhaser: FC<Props> = ({ isActive }) => {
  const dispatch = useDispatch();

  // SELECTORS

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectMinHeight);
  const roundMembersArray = useSelector(selectors.round.selectMembersAsArray);
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isRoundStarted = useSelector(selectors.round.selectIsStarted);
  const roundId = useSelector(selectors.round.selectId);
  const world = useSelector(selectors.round.selectWorld);
  const playersRole = useSelector(selectors.round.selectPlayersRole);
  const areaDevices = useSelector(selectors.area.selectDevices);

  // DOM REF

  const $parent = useRef<HTMLDivElement>(null);

  // PHASER REF

  const $game = useRef<Phaser.Game | null>(null);
  const $mainScene = useRef(
    new MainScene({
      dispatch,
      world,
      playerId,
      playersRole,
      areaDevices,
      roundMembersArray: roundMembersArray,
      isRoundStarted
    })
  );

  // STATE

  const [isGameReady, setIsGameReady] = useState(false);

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
            x: -150,
            left: false,
            right: false,
            width: areaWidth + 150,
            thickness: 30
          },
          "plugins.wrap": true
        }
      },
      plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision",
            mapping: "matterCollision"
          }
        ]
      },
      scene: $mainScene.current
    };

    $game.current = new Phaser.Game(gameConfig);

    $game.current.events.on(Phaser.Core.Events.READY, () => {
      setIsGameReady(true);
    });
  }, [areaHeight, areaWidth]);

  // SIDE EFFECTS

  // on mount -> create game

  useEffect(() => {
    createGame();
  }, [createGame]);

  // update dispatch

  useEffect(() => {
    $mainScene.current.setDispatch(dispatch);
  }, [dispatch]);

  // update world

  useEffect(() => {
    $mainScene.current.setWorld(world);
  }, [world]);

  // update playerId

  useEffect(() => {
    $mainScene.current.setPlayerId(playerId);
  }, [playerId]);

  // update playersRole

  useEffect(() => {
    $mainScene.current.setPlayersRole(playersRole);
  }, [playersRole]);

  // update areaDevices

  useEffect(() => {
    $mainScene.current.setAreaDevices(areaDevices);
  }, [areaDevices]);

  // update roundMembersArray

  useEffect(() => {
    $mainScene.current.setRoundMembersArray(roundMembersArray);
  }, [roundMembersArray]);

  // listen isRoundStarted -> pause or resume

  useEffect(() => {
    if (isGameReady) {
      console.log({ isRoundStarted });
      // isRoundStarted
      //   ? $mainScene.current.matter.resume()
      //   : $mainScene.current.matter.pause();
    }
  }, [isGameReady, isRoundStarted]);

  useEffect(() => {
    if (isRoundStarted && roundId > 1) {
      // TODO: wip
      $mainScene.current.newRound();
    }
  }, [isRoundStarted, roundId]);

  // on unmount : stop game

  useEffect(() => {
    return () => {
      if ($game.current) {
        $game.current.destroy(true);
      }
      // dispatch(actions.round.stop());
    };
  }, [dispatch]);

  // return

  return <div className="game-phaser" ref={$parent} />;
};

export default GamePhaser;
