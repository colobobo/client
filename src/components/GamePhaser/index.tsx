import React, { FC, useRef, useEffect, useCallback, useState } from "react";
import * as Phaser from "phaser";
import { selectors, actions } from "../../redux";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";

import MainScene from "./MainScene";

const GamePhaser: FC = () => {
  const dispatch = useDispatch();

  // SELECTORS

  const areaWidth = useSelector(selectors.area.selectWidth);
  const areaHeight = useSelector(selectors.area.selectMinHeight);
  const gameMembersArray = useSelector(selectors.round.selectMembersAsArray);
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isRoundStarted = useSelector(selectors.round.selectIsStarted);
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
      gameMembersArray,
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
            x: -300,
            left: false,
            right: false,
            width: areaWidth + 600,
            thickness: 100
          },
          "plugins.wrap": true
        }
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

  // update gameMembersArray

  useEffect(() => {
    $mainScene.current.setGameMembersArray(gameMembersArray);
  }, [gameMembersArray]);

  // listen isRoundStarted -> pause or resume

  useEffect(() => {
    if (isGameReady) {
      isRoundStarted
        ? $mainScene.current.matter.resume()
        : $mainScene.current.matter.pause();
    }
  }, [isGameReady, isRoundStarted]);

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
