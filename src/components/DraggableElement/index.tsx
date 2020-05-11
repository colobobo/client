import React, { FC, useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { gsap, Linear } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useTypedSelector } from "../../redux/store";
import { selectors, actions } from "../../redux";
import DraggableWrapper from "../DraggableWrapper";
import "./index.scss";

interface Props {
  id: string;
}

const DraggableElement: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();

  // selectors

  const gameTick = useTypedSelector(selectors.game.selectTick);
  const elementPosition = useTypedSelector(state =>
    selectors.game.selectObject(state, { id })
  );

  // ref

  const $element = useRef(null);
  const $draggableInstance = useRef<Draggable | null>(null);

  // state

  const [isDragging, setIsDragging] = useState(false);

  // handlers

  const handleOnRef = useCallback(ref => {
    $element.current = ref;
  }, []);

  const handleOnDragInstance = useCallback(draggableInstance => {
    $draggableInstance.current = draggableInstance;
  }, []);

  const handleOnDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleOnDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleOnDrag = useCallback(() => {
    if ($draggableInstance.current) {
      const { x, y } = $draggableInstance.current;

      dispatch(
        actions.webSocket.emit.game.positionUpdate({
          x,
          y,
          id
        })
      );
    }
  }, [dispatch, id]);

  // effects

  useEffect(() => {
    if (!isDragging) {
      gsap.to($element.current, {
        x: elementPosition.x,
        y: elementPosition.y,
        duration: gameTick / 1000,
        ease: Linear.easeNone
      });
    }
  }, [elementPosition.x, elementPosition.y, gameTick, isDragging]);

  // return

  return (
    <DraggableWrapper
      classNames={"draggable-element"}
      bounds={".area"}
      onDraggableInstance={handleOnDragInstance}
      onDragStart={handleOnDragStart}
      onDrag={handleOnDrag}
      onDragEnd={handleOnDragEnd}
      onRef={handleOnRef}
    />
  );
};

export default DraggableElement;
