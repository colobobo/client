import React, { FC, useCallback, useEffect, useState, useRef } from "react";
import Area from "../../Area";

import { gsap, Linear } from "gsap";
import { Draggable } from "gsap/Draggable";

import "./game.scss";
import { useTypedSelector } from "../../../redux/store";
import { selectors, actions } from "../../../redux";
import { useDispatch } from "react-redux";

gsap.registerPlugin(Draggable);

const Game: FC = () => {
  const dispatch = useDispatch();

  // selectors
  const gameTick = useTypedSelector(selectors.game.selectTick);
  const gamePosition = useTypedSelector(selectors.game.selectPosition);

  // ref
  const $circle = useRef(null);
  const $draggable = useRef<Draggable[] | null>(null);

  // state

  const [isDragging, setIsDragging] = useState(false);

  // handlers

  const handleOnDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleOnDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleOnDrag = useCallback(() => {
    if ($draggable.current) {
      const { x, y } = $draggable.current[0];

      dispatch(
        actions.webSocket.emit.game.positionUpdate({
          data: { x, y }
        })
      );
    }
  }, [dispatch]);

  // effects

  useEffect(() => {
    $draggable.current = Draggable.create($circle.current, {
      bounds: ".area",
      onDragStart: handleOnDragStart,
      onDragEnd: handleOnDragEnd,
      onDrag: handleOnDrag
    });
  }, [handleOnDrag, handleOnDragEnd, handleOnDragStart]);

  useEffect(() => {
    if (!isDragging) {
      gsap.to($circle.current, {
        x: gamePosition.x,
        y: gamePosition.y,
        duration: gameTick / 1000,
        ease: Linear.easeNone
      });
    }
  }, [gamePosition.x, gamePosition.y, gameTick, isDragging]);

  // return

  return (
    <div className="game">
      <Area>
        <div ref={$circle} className="game__circle" />
      </Area>
    </div>
  );
};

export default Game;
