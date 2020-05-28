import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  CSSProperties
} from "react";
import { useDispatch } from "react-redux";
import { gsap, Linear } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useTypedSelector } from "../../redux/store";
import { selectors, actions } from "../../redux";
import DraggableWrapper from "../DraggableWrapper";
import classnames from "classnames";
import "./index.scss";

interface Props {
  classNames?: string;
  styles?: CSSProperties;
  id: string;
  x: number;
  y: number;
  xOffset?: number;
  text?: string;
}

const DraggableElement: FC<Props> = ({
  classNames = "",
  styles,
  id,
  x,
  y,
  xOffset = 0,
  text
}) => {
  const dispatch = useDispatch();

  // selectors

  const roundTick = useTypedSelector(selectors.round.selectTick);

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
        actions.webSocket.emit.round.memberMove({
          x: x - xOffset,
          y,
          id
        })
      );
    }
  }, [dispatch, id, xOffset]);

  // effects

  useEffect(() => {
    if (!isDragging) {
      gsap.to($element.current, {
        x: x + xOffset,
        y: y,
        duration: roundTick / 1000,
        ease: Linear.easeNone
      });
    }
  }, [roundTick, isDragging, x, xOffset, y]);

  useEffect(() => {
    // opcity 1 after 0.1 seconde
    gsap.set($element.current, {
      opacity: 1,
      delay: 0.1
    });
  }, []);

  // return

  return (
    <DraggableWrapper
      classNames={classnames("draggable-element", classNames)}
      styles={styles}
      // bounds={".area"}
      onDraggableInstance={handleOnDragInstance}
      onDragStart={handleOnDragStart}
      onDrag={handleOnDrag}
      onDragEnd={handleOnDragEnd}
      onRef={handleOnRef}
    >
      <p className={"draggable-element__text"}>{text}</p>
    </DraggableWrapper>
  );
};

export default DraggableElement;
