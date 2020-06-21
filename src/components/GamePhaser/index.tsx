import React, {
  FC,
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo
} from "react";
import * as Phaser from "phaser";
import { selectors } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../redux/store";
import { getGameConfig } from "../../phaser/configs/gameConfig";
import Game from "../../phaser/Game";
import "./index.scss";

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
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );

  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);

  const pixelRatio = useMemo(() => window.devicePixelRatio, []);

  // DOM REF

  const $parent = useRef<HTMLDivElement>(null);

  // PHASER REF

  const $game = useRef<Game | null>(null);

  // STATE

  const [isGameReady, setIsGameReady] = useState(false);

  // create phaser game

  const createGame = useCallback(() => {
    if (!$game.current) {
      const gameConfig = getGameConfig({
        areaHeight,
        areaWidth,
        parent: $parent.current!,
        pixelRatio
      });

      $game.current = new Game(gameConfig, {
        dispatch,
        world,
        playerId,
        playersRole,
        areaDevices,
        roundMembersArray: roundMembersArray,
        isRoundStarted,
        areaWidth,
        areaHeight,
        pixelRatio
      });

      $game.current.events.on(Phaser.Core.Events.READY, () => {
        setIsGameReady(true);
      });
    }
  }, [
    areaDevices,
    areaHeight,
    areaWidth,
    dispatch,
    isRoundStarted,
    pixelRatio,
    playerId,
    playersRole,
    roundMembersArray,
    world
  ]);

  // SIDE EFFECTS

  // on mount -> create game

  useEffect(() => {
    createGame();
  }, [createGame]);

  // update dispatch

  useEffect(() => {
    $game.current?.setDispatch(dispatch);
  }, [dispatch]);

  // update world

  useEffect(() => {
    $game.current?.setWorld(world);
  }, [world]);

  // update playerId

  useEffect(() => {
    $game.current?.setPlayerId(playerId);
  }, [playerId]);

  // update playersRole

  useEffect(() => {
    $game.current?.setPlayersRole(playersRole);
  }, [playersRole]);

  // update areaDevices

  useEffect(() => {
    $game.current?.setAreaDevices(areaDevices);
  }, [areaDevices]);

  // update roundMembersArray

  useEffect(() => {
    $game.current?.setRoundMembersArray(roundMembersArray);
  }, [roundMembersArray]);

  // listen isRoundStarted -> pause or resume

  useEffect(() => {
    if (isGameReady) {
      // TODO : play / pause game
      // isRoundStarted
      //   ? $mainScene.current.matter.resume()
      //   : $mainScene.current.matter.pause();
    }
  }, [isGameReady, isRoundStarted]);

  useEffect(() => {
    if (isRoundStarted && roundId > 1) {
      // TODO: wip
      $game.current?.newRound();
    }
  }, [isRoundStarted, roundId]);

  // TODO : update
  useEffect(() => {
    if (isTransitionStarted && roundId === 1) {
      $game.current?.startPreloader();
    }
  }, [isTransitionStarted, roundId]);

  // on unmount : stop game

  useEffect(() => {
    return () => {
      if ($game.current) {
        $game.current.destroy(true);
      }
      // dispatch(actions.round.stop());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isGameReady) {
      if (isActive) {
        $game.current?.resume();
      } else {
        $game.current?.pause();
      }
    }
  }, [isActive, isGameReady]);

  // return

  return (
    <div
      className="game-phaser"
      ref={$parent}
      style={{
        left: device.offsetX,
        width: device.width
      }}
    />
  );
};

export default GamePhaser;
